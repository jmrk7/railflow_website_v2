import React from "react";
import Layout from "../components/Layout";
// import ComingSoon from '../components/coming-soon';
import { PricingPlans, PricingFaq} from "../components/pricing-sections";

const PricingPage = () => {
  return (
    <Layout>
      <PricingPlans />
      <PricingFaq />
    </Layout>
  );
};

export default PricingPage;
