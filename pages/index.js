import * as React from "react";

import Layout from "../components/layout";

import Hero from "../components/index-page-sections/hero";
import Features from "../components/index-page-sections/features";
// import Platforms from "../components/index-page-sections/platforms";

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      {/* <Platforms /> */}
    </Layout>
  );
}

export default IndexPage;