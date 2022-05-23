import stripe from "stripe";
import path from "path";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
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

    const priceResult = await axios.get(
      `${process.env.PRICING_URL}pricing?license_years=${request.body.license_years}&license_type=${request.body.license_type}&num_users=${request.body.num_users}`
    );
    
    const priceObject = await Stripe.prices.create({
      unit_amount: Number(priceResult.data.pricing.final_price) * 100,
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

    console.log("Start Writing File");
    console.log(path.join(process.cwd(), `/public/pdf/${quote.id}.pdf`));

    await new Promise((resolve) => {
      pdf.pipe(
        createWriteStream(
          path.join(process.cwd(), `/public/pdf/${quote.id}.pdf`)
        )
      );
      pdf.on("end", () => resolve());
    });
    console.log("End File");

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
