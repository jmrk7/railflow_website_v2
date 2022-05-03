import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import * as styles from './job-description.module.scss';

const cx = classnames.bind(styles);

const JobDescription = ({ job }) => {
  return (
    <section id="job-description" className={cx('jobDescription')}>
      <LayoutSectionContainer>
        <div className={cx('jobDescription_sectionContainer')}>
          <div className={cx('jobDescription_section')}>
            <h1 className={cx('jobDescription_title')}>
              We are looking for: {job.name}
            </h1>
            <h2 className={cx('jobDescription_desc')}>
              What we can offer: {job.desc}
            </h2>

            <div className={cx('jobDescription_text')}>
              <p>
                <strong>About Us</strong>
              </p>
              <p>
                Railflow is a small, nimble, and fully remote company.
                Our head quarters is located in San Francisco, CA,
                USA. We love technology and our core mission is
                focuing on QA engineering productivity by developing
                exciting solutions for TestRail. We only foucs on one
                thing (TestRail) and we do it really well. If you live
                and breathe test automation, understand the
                complexities of manual and automated testing, test
                reporting, TestRail APIs, integrations, we want you in
                our team.
              </p>
              <p>
                If you’re looking for a dynamic, no corporate-BS
                environment to learn, grow, and really make an impact,
                we could be the perfect fit for you!
              </p>

              <p>
                <strong>Main Responsibilities</strong>
              </p>
              <ul>
                {job.responsibilities.map((v) => (
                  <li>{v}</li>
                ))}
              </ul>
              <p>
                <strong>Qualifications &amp; Experience</strong>
              </p>
              <ul>
                {job.qualifications.map((v) => (
                  <li>{v}</li>
                ))}
              </ul>

              <p>
                <h1 id="location">Location</h1>
              </p>
              <p>{job.location}</p>
            </div>

            <p className={cx('jobDescription_text')}>
              If you are interested, send us your resume at{' '}
              <a href="mailto:contact@railflow.io">
                contact@railflow.io
              </a>
            </p>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default JobDescription;
