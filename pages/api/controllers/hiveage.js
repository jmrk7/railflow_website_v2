/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

 "use strict";

 import ApiError from "../errors/api";
 import noteService from "../services/note";
 import invoiceService from "../services/invoice";
 import contactService from "../services/contact";
 import accountService from "../services/account";
 import slackService from "../services/slack";
 import quoteService from "../services/quote";
 import taskService from "../services/task";
 import { checkToken } from "../services/token";
 import logger from "../config/logger";
 
 /**
  * Function: Create new Invoice
  * @param {*} req Request
  * @param {*} res Response
  * @param {*} next Next
  * @returns Promise
  */
 async function createHiveage(req, res, next) {
   // Middleware: Check token beforehand
   const isAuthenticated = await checkToken(req.headers.token);
   if (!isAuthenticated) {
     return res.status(400).send({
       status: 400,
       message: "token invalid or missing",
     });
   }
 
   try {
     const data = {
       account_id: req.body.account_id,
       contact_id: req.body.contact_id,
       num_users: req.body.num_users,
       license_type: req.body.license_type,
       license_years: req.body.license_years,
     };
 
     if (typeof data.contact_id == "undefined" || data.contact_id == "") {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Missing required parameter: contact_id",
         },
       });
     }
 
     if (typeof data.account_id == "undefined" || data.account_id == "") {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Missing required parameter: account_id",
         },
       });
     }
 
     if (typeof data.num_users == "undefined") {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Missing required parameter: num_users",
         },
       });
     }
 
     if (isNaN(data.num_users) || data.num_users < 0 || data.num_users > 49) {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Invalid num_users: valid value is: 0-49",
         },
       });
     }
     if (typeof data.license_type == "undefined") {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Missing required parameter: license_type",
         },
       });
     }
 
     if (typeof data.license_years == "undefined") {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Missing required parameter: license_years",
         },
       });
     }
 
     if (isNaN(data.license_years) || data.license_years < 0 || data.license_years > 3) {
       return res.status(400).send({
         status: 400,
         data: {
           message: "Invalid License_years: valid values are 0-3",
         },
       });
     }
 
     // check if the contact is already there.
     let contact = await contactService.getContactById(data.contact_id);
     if (!contact) {
       return res.status(404).send({
         status: 404,
         data: {
           message: "Contact does not exist",
           contact_id: data.contact_id,
         },
       });
     }
     data.user = contact;
     let account = await accountService.getAccountById(data.account_id);
     if (!account) {
       return res.status(404).send({
         status: 404,
         data: {
           message: "Account does not exist",
           account_id: data.account_id,
         },
       });
     }
     data.account = account;
     let network = null;
     if (account.custom_field.cf_hiveage_hash != null) {
       network = await accountService.getHiveageNetwork(account.custom_field.cf_hiveage_hash);
     }
     if (account.custom_field.cf_hiveage_hash == null || !network) {
       const networkData = {
         name: account.name,
         first_name: contact.first_name,
         last_name: contact.last_name,
         address: contact.address,
         city: contact.city,
         state_name: contact.state,
         zip_code: contact.zipcode,
         country: contact.country,
         business_email: contact.email,
         primary_contact_first_name: contact.first_name,
         primary_contact_last_name: contact.last_name,
         category: "organization",
         currency: "USD",
         language: "en-us",
       };
       try {
         network = await accountService.createHiveageNetwork(networkData);
         const updatedAccount = await accountService.updateHiveageHash(account.id, network.hash_key);
       } catch (error) {
         logger.error("error when create hiveage network", error);
         return res.status(500).send({
           status: 500,
           data: {
             message: `error when create hiveage network`,
             account_id: req.body.account_id,
           },
         });
       }
     }
     data.network = network;
     if (typeof req.body.hiveage_contact_email == "undefined") {
       data.hiveage_contact_email = false;
     } else {
       data.hiveage_contact_email = [
         {
           email: req.body.hiveage_contact_email,
         },
       ];
       data.hiveage_notification_emails = [];
       req.body.hiveage_notification_emails.forEach((element) => {
         data.hiveage_notification_emails.push({
           email: element,
         });
       });
     }
     const invoice = await invoiceService.createInvoice(data);
     if (invoice.error != null) {
       return res.status(400).send({
         status: 400,
         data: {
           message: invoice.error.message,
           account_id: req.body.account_id,
           contact_id: req.body.contact_id,
         },
       });
     }
 
      await noteService.create(
        contact.id,
        `Invoice: https://railflow.hiveage.com/invs/${invoice.invoice.hash_key}`
      );
      await noteService.accountNote(
        account.id,
        `Invoice: https://railflow.hiveage.com/invs/${invoice.invoice.hash_key}`
      );
 
     const quote = await quoteService.create(data);
     if (quote.error != null) {
       return res.status(400).send({
         status: 400,
         data: {
           message: quote.error.message,
           account_id: req.body.account_id,
           contact_id: req.body.contact_id,
         },
       });
     }
 
     await noteService.create(
       contact.id,
       `Quote: https://railflow.hiveage.com/estm/${quote.estimate.hash_key}`
     );
     await noteService.accountNote(
       account.id,
       `Quote: https://railflow.hiveage.com/estm/${quote.estimate.hash_key}`
     );
     // await slackService.sendSlackMessage(
     //   `Railflow Price Inquiry: <https://railflow.myfreshworks.com/crm/sales/accounts/${account.id}|${account.name}>: <https://railflow.hiveage.com/estm/${quote.estimate.hash_key}|Quote>,  <https://railflow.hiveage.com/invs/${invoice.invoice.hash_key}|Invoice>`
     // );
     await slackService.sendSlackMessage(
       `Railflow Price Inquiry: <https://railflow.myfreshworks.com/crm/sales/accounts/${account.id}|${account.name}>`
     );
 
     const taskData1 = {
       owner_id: 16000006416,
       title: "Update opportunity contacts",
       description: `Update opportunity account id: ${data.account.id}`,
       due_date: 24,
       targetable_id: data.account.id,
       targetable_type: "SalesAccount",
     };
     const taskData2 = {
       owner_id: 16000006416,
       title: `${data.account.name}: Quote follow up`,
       description: `Quote follow up account id: ${data.account.id}\nOpportunity Link: https://railflow.myfreshworks.com/crm/sales/deals/${quote.fsOpportunity.id}`,
       due_date: 7,
       targetable_id: quote.fsOpportunity.id,
       targetable_type: "Deal",
     };
     const task1 = await taskService.createTask(taskData1);
     const task2 = await taskService.createTask(taskData2);
 
     return res.status(201).send({
       status: 201,
       message: " quote created",
       invoiceLink: `https://railflow.hiveage.com/invs/${invoice.invoice.hash_key}`,
       quoteLink: `https://railflow.hiveage.com/estm/${quote.estimate.hash_key}`,
       // opportunityInvoiceLink: `https://railflow.myfreshworks.com/crm/sales/deals/${invoice.fsOpportunity.id}`,
       opportunityQuoteLink: `https://railflow.myfreshworks.com/crm/sales/deals/${quote.fsOpportunity.id}`,
     });
   } catch (error) {
     logger.error(`controllers:hievage:`, error);
     return res.status(500).send({
       status: 500,
       data: {
        message: "something went wrong",
      },
     });
   }
 }
 
 module.exports = {
   createHiveage,
 };
 