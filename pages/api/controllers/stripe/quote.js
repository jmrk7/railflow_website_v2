import stripe from "stripe";
import path from "path";
import absoluteUrl from "next-absolute-url";
import pricing from "../../config/pricing.json";
import contactService from "../../services/contact";
import { createWriteStream } from "fs";

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

async function createQuote(request, res, next) {
  try {
    let contact = await contactService.getContactIfAlreadyPresent(
      request.body.email
    );

    const reqData = {
      contact_id: contact.id,
      contact_first_name: contact.first_name,
      contact_last_name: contact.last_name,
      contact_cf_company: contact.custom_field.cf_company,
      contact_email: contact.email,
    };

    const pricingType = pricing[request.body.license_type.toLowerCase()];

    let price;
    request.body.license_years != 0
      ? (price =
          (pricingType["base"] +
            pricingType["increment"] * request.body.num_users) *
          (1 - pricingType[`discount_${request.body.license_years}_year`]) *
          request.body.license_years)
      : (price =
          (pricingType["base"] +
            pricingType["increment"] * request.body.num_users) *
          4 *
          (1 - pricingType["discount_perpetual"]));

    const priceObject = await Stripe.prices.create({
      unit_amount: price * 100,
      currency: "usd",
      product: "prod_railflow",
    });

    const paymentLink = await Stripe.paymentLinks.create({
      line_items: [{ price: priceObject.id, quantity: 1 }],
    });

    const quote = await Stripe.quotes.create({
      customer: request.body.stripe_id,
      line_items: [{ price: priceObject.id }],
      description: `Railflow Enterprise Quote: ${
        request.body.license_years
      } year License: ${request.body.num_users * 20}-${
        (request.body.num_users + 1) * 20
      } Users`,
    });

    const result = await Stripe.quotes.finalizeQuote(quote.id);
    const pdf = await Stripe.quotes.pdf(quote.id);

    await new Promise((resolve) => {
      pdf.pipe(
        createWriteStream(
          path.join(process.cwd(), `/public/pdf/${quote.id}.pdf`)
        )
      );
      pdf.on("end", () => resolve());
    });

    reqData.cf_stripe_customer_id = request.body.stripe_id;
    reqData.cf_stripe_quote_link =
      absoluteUrl(request).origin + `/pdf/${quote.id}.pdf`;
    await contactService.updateByStripeQuote(reqData);

    const sendData = {
      link: reqData.cf_stripe_quote_link,
      payment_link: paymentLink.url,
    };
    res.send(sendData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = {
  createQuote,
};
