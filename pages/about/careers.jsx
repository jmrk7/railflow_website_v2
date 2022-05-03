import React from "react";

import Layout from "../../components/layout";
// import ComingSoon from '../components/coming-soon';
import {
  JobPosts,
  // TODO: import remaining sections
} from "../../components/careers-sections";

const CareersPage = () => {
  return (
    <Layout>
      <JobPosts />
    </Layout>
  );
};

export default CareersPage;
