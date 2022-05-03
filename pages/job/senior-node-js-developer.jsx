import React from "react"
import JobDescription from "../../components/careers-sections/job-description/job-description"
import { currentJobs } from "../../components/careers-sections/job-posts/job-posts"

import Layout from "../../components/layout"

const SeniorNodeDevPage = () => {
  return (
    <Layout>
      <JobDescription job={currentJobs[0]} />
    </Layout>
  )
}

export default SeniorNodeDevPage
