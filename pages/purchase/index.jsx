import React from "react";
import classnames from "classnames/bind";

import FormContainer from "../../components/form-container";

import Layout from "../../components/Layout";
import QuoteFrom from "../../components/quote-form";
import QuoteHero from "../../components/quote-hero";
// import ComingSoon from '../components/coming-soon';
import * as styles from "./purchase.module.scss";

const cx = classnames.bind(styles);
const GetQuotePage = (props) => {
  const priceIndex = props["price-index"] || "1";
  const licenseType = props["license-type"] || "professional";
  const buytype = props["type"] || "buy";
  const support = props["support"] || false;

  return (
    <Layout isHeaderPresent={false} isFooterPresent={false}>
      <div className={cx("purchaseWrapper")}>
        <QuoteHero />
        <FormContainer>
          <QuoteFrom priceIndex={priceIndex * 2 - 1} licenseType={licenseType} buytype={buytype} support={support}/>
        </FormContainer>
      </div>
    </Layout>
  );
};

GetQuotePage.getInitialProps = async ({ query }) => {
  return query;
};

export default GetQuotePage;
