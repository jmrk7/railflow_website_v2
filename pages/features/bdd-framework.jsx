import React from "react";

import Layout from "../../components/Layout";
// import ComingSoon from '../components/coming-soon';
import FeaturePage from "../../components/feature-sections";
import features1Image from "../../public/images/features_1.png";
import features2Image from "../../public/images/features_2.png";

const BDDFrameworkPage = () => {
  const feature = {
    heroTitle: "BDD Framework Integration",
    heroText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas adipisci, corporis recusandae odit dolorem esse cumque porro dolorum tenetur, quisquam voluptatum neque ipsam. Maiores, tempora vero. Perferendis quam adipisci odio. ",
    featureList: [
      {
        id: "bdd-framework-integration-1",
        title: "BDD Framework Feature 1",
        text: `
          Proin ac quam et lectus vestibulum blandit.
          Nunc maximus nibh at placerat tincidunt.
          Nam sem lacus, ornare non ante sed, ultricies fringilla massa.
          Ut congue, elit non tempus elementum, sem risus tincidunt diam, vitae sodales diam ipsum vitae purus.
        `,
        image: features1Image,
      },
      {
        id: "bdd-framework-integration-2",
        title: "BDD Framework Feature 2",
        text: `
          Proin ac quam et lectus vestibulum blandit.
          Nunc maximus nibh at placerat tincidunt.
          Nam sem lacus, ornare non ante sed, ultricies fringilla massa.
          Ut congue, elit non tempus elementum, sem risus tincidunt diam, vitae sodales diam ipsum vitae purus.
        `,
        image: features2Image,
      },
    ],
  };
  return (
    <Layout>
      <FeaturePage feature={feature} />
    </Layout>
  );
};

export default BDDFrameworkPage;
