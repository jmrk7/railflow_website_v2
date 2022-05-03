import React from 'react';
import { Helmet } from "react-helmet";
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import * as styles from './job-posts.module.scss';
import JobListItem from '../job-list-item';

const cx = classnames.bind(styles);

export const currentJobs = [
  {
    id: 'senior-node-js-developer',
    name: 'Senior Node JS Developer',
    desc:
      'The Railflow team is looking for seasoned nodejs developer who is a strategic thinker, team player, and a self motivated problem solver to join our growing team. We need your help to build exciting solutions for our customers who use TestRail for test case management. You will be developing CLI, libraries, APIs, and creating them in such a way that TestRail users find them utterly indispensable.',
    location: 'Remote',
    responsibilities: [
      'Implement delighful features for current and future customers.',
      'Research testing tools and frameworks, CICD applications and design the best solutions for our customers.',
      'Support and demo meetings with prospective customers.',
      'Fully own the design, implementation, and release of features.',
      'Develop frontend and backend services in NodeJS and React.',
      'Develop and extend CI and CD pipeline.',
    ],
    qualifications: [
      'Expert in Node.js development - 3-5 years working experience.',
      'DevOPS and Build Engineering experience using Jenkins, Gitlab, Github, etc.',
      'Hands on experience with writing unit tests, and integration tests in JEST, Mocha, Jasmine, etc.',
      'Experience with common API formats (e.g. JSON, XML, Websockets)',
      'A working understanding with Linux',
      'Basic knowledge of Docker and containerization',
    ],
  },
  {
    id: 'senior-java-developer',
    name: 'Senior JAVA/J2EE Developer',
    desc:
      'The Railflow team is looking for seasoned J2EE developer who is a strategic thinker, team player, and a self motivated problem solver to join our growing team. We need your help to build exciting solutions for our customers who use TestRail for test case management. You will be developing CLI, libraries, APIs, test frameworks, CICD integrations, and creating them in such a way that TestRail users find them utterly indispensable.',
    location: 'Remote',
    responsibilities: [
      'Implement delighful features for current and future customers.',
      'Research testing tools and frameworks, CICD applications and design the best solutions for our customers.',
      'Support and demo meetings with prospective customers.',
      'Fully own the design, implementation, and release of features.',
      'Develop frontend and backend services in JAVA and Kotlin.',
      'Develop and extend CI and CD pipeline.',
    ],
    qualifications: [
      'Expert in JAVA/J2EE development - 3-5 years working experience.',
      'DevOPS and Build Engineering experience using Jenkins, Gitlab, Github, etc.',
      'Hands on experience with writing unit tests, and integration tests in JUnit, TestNG, JBehave, Serenity, Cucumber, etc',
      'Experience using JAVA builds tools such as Maven, Gradle, and Ivy',
      'Experience with common API formats (e.g. JSON, XML, Websockets)',
      'A working understanding with Linux',
      'Basic knowledge of Docker and containerization',
    ],
  },
];

const JobPosts = () => {
  return (
    <section id="job-posts" className={cx('jobPosts')}>
      <LayoutSectionContainer>
        <div className={cx('jobPosts_sectionContainer')}>
          <div className={cx('jobPosts_section')}>
            <h1 className={cx('jobPosts_title')}>
              Careers at Railflow
            </h1>
            <p className={cx('jobPosts_text')}>
              Railflow is a small, nimble, and fully remote company.
              We are hyper focused on developing exciting solutions
              for TestRail. If you live and breathe test automation,
              understand the complexities of manual and automated
              testing, test reporting, TestRail APIs, integrations, we
              want you in our team.
            </p>
            <div className={cx('jobPosts_list')}>
              {currentJobs.map((job) => (
                <JobListItem key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default JobPosts;
