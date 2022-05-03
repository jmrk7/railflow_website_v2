import React from "react";

import JobDescription from "../../components/careers-sections/job-description/job-description";
import { currentJobs } from "../../components/careers-sections/job-posts/job-posts";

import Layout from "../../components/Layout";

const SeniorJavaDevPage = () => {
  return (
    <Layout>
      <JobDescription job={currentJobs[1]} />
    </Layout>
  );
};

export default SeniorJavaDevPage;
