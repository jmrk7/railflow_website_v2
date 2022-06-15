import stripe from "stripe";
import path from "path";
import axios from "axios";
import AWS from "aws-sdk";
import absoluteUrl from "next-absolute-url";

import contactService from "../../services/contact";
import { createWriteStream, readFileSync } from "fs";
import { sendDataToMixpanel } from "../../services/mixpanel";
import slackService from "../../services/slack";

const spacesEndpoint = new AWS.Endpoint(process.env.SPACE_ENDPOINT + "/quotes");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
}); 

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

    const apiBaseUrl = absoluteUrl(request).origin;
    const priceResult = await axios.get(
      `${apiBaseUrl}/api/routes/pricing?license_years=${request.body.license_years}&license_type=${request.body.license_type}&num_users=${request.body.num_users}`
    );
    
    const priceObject = await Stripe.prices.create({
      unit_amount: Number(priceResult.data.pricing.final_price) * 100,
      currency: "usd",
      product: process.env.STRIPE_TEST_PRODUCT,
    });

    const paymentLink = await Stripe.paymentLinks.create({
      line_items: [{ price: priceObject.id, quantity: 1 }],
    });

    const quote = await Stripe.quotes.create({
      customer: request.body.stripe_id,
      line_items: [{ price: priceObject.id }],
      description: `Railflow ${request.body.license_type} quote for TestRail: ${
        request.body.license_years
      } year License for ${request.body.num_users * 20}-${
        (request.body.num_users + 1) * 20
      } Users`,
    });

    const result = await Stripe.quotes.finalizeQuote(quote.id);
    const pdf = await Stripe.quotes.pdf(quote.id);

    await new Promise((resolve) => {
      pdf.pipe(
        createWriteStream(
          path.join(process.cwd(), `/public/pdf/temp.pdf`)
        )
      );
      pdf.on("end", () => resolve());
    });

    const quotePdf = readFileSync(path.join(process.cwd(), `/public/pdf/temp.pdf`));

    s3.putObject(
      {
        Bucket: "railflow",
        Key: `${quote.id}.pdf`,
        Body: quotePdf,
        ACL: "public-read",
      },
      (err, data) => {
        if (err) return res.status(500).send(err);
        console.log("your file has been uploaded successfully");
      }
    );

    reqData.cf_stripe_customer_id = request.body.stripe_id;
    reqData.cf_stripe_quote_link = `https://railflow.sfo3.digitaloceanspaces.com/quotes/${quote.id}.pdf`;
    
    const eventData = {
      Name: contact.first_name + " " + contact.last_name,
      Email: contact.email,
      Company: contact.custom_field.cf_company,
      Stripe_Customer_id: contact.id,
      Quote_Pdf_link: reqData.cf_stripe_quote_link,
    }

    await sendDataToMixpanel("Quote Event", eventData);

    await contactService.updateByStripeQuote(reqData);

    const sendData = {
      link: reqData.cf_stripe_quote_link,
      payment_link: paymentLink.url,
      type: "Quote"
    };

    if(process.env.SLACK_MESSAGE_ENABLED) await slackService.sendMessage(sendData);

    res.send(sendData);
    
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = {
  createQuote,
};
