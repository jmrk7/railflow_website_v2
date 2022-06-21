import React from "react";
import classnames from "classnames/bind";

import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { LayoutSectionContainer } from "../../Layout";
import * as styles from "./pricing-faq.module.scss";

const cx = classnames.bind(styles);

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  backgroundColor: "#424242",
  color: "white",
  border: "1px solid rgba(0, 0, 0, .125)",
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&$expanded": {
    margin: "auto",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
  marginBottom: -1,
  maxHeight: 73,
  "& .MuiSvgIcon-root": {
    color: "white"
  }
}));

const frequentlyAskedQuestions = [
  {
    question: "How many licenses do I need?",
    answer:
      "Railflow pricing is based on the number of your TestRail Licenses and offered in increments of 10 users.",
  },
  {
    question: "Does Railflow accept purchase orders?",
    answer:
      "Yes, besides accepting Master Card and VISA and wire transfers, you can also pay via your company's usual procurement process and send us an official purchaes order document. We typcially do NET 45 days to accomodate your purchase order payment terms.",
  },
  {
    question: "Can I extened my evaluation license?",
    answer:
      "Absolutely. There is no pressure to buy and no sales person will ever call your phone or hide pricing details from your team. We want you to be 100% satisfied with your evaluation before you become a valued customer. If that means, you need to extend you evaluation, simply reach out to our sales team and we will gladly extend your license.",
  },
  {
    question: "Do you work with software resellers?",
    answer:
      "We work with a host of software resellers across the globe to help work with company's designated resellers. We don't offer any reseller discounts.",
  },
  {
    question: "What version of TestRail is Railflow comptable with?",
    answer:
      "Railflow works with all versions of TestRail 6.x and 7.x. As new new versions of TestRail are released, we test the full functionality in our testing labs through rigorous automated testings. If you run into any issues or believe you have encountered a bug, please contact our support team and we will get on it right away. ",
  },
  {
    question: "I registered online and haven't received my license?",
    answer:
      "Once you register online using your corporate email address, it takes about 6-12 hours for our team to send you a welcome email with an evaluation license. If you haven't received this email and have checked your spam folder, please contact our support team and we can sort this out.",
  },
  {
    question: "Is the CLI really free? What is the catch?",
    answer:
      "Yes. The free CLI fully supports the JUnit reporting format. There are no gimmicks and tricks. We do hope that in the future you will consider upgrading to Professional or Enterprise to experience the full power of Railflow and enjoy world class support. ",
  },
  {
    question: "Can I purchase Support for the free CLI?",
    answer:
      "If you have business critical needs, you can definitely purchase stand alone Support License for the free CLI. Please contact our support team for details. ",
  },
];

const PricingFaq = () => {
  return (
    <section id="feature-list" className={cx("pricingFaq")}>
      <LayoutSectionContainer>
        <h1 className={cx("pricingFaq_topTitle")}>
          Frequently Asked Questions
        </h1>
        <div className={cx("pricingFaq_sectionContainer")}>
          {frequentlyAskedQuestions.map((faq, idx) => (
            <div key={idx} className={cx("pricingFaq", "pricingFaq_section")}>
              <Accordion square={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <p className={cx("pricingFaq_question")}>{faq.question}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className={cx("pricingFaq_answer")}>{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default PricingFaq;
