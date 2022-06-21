import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";

import featureDefaultImage from "../../../public/images/feature-image-default.jpeg";
import featureKatalon from "../../../public/images/home_features/katalon-min.webp";

import Button from "../../button";
import CalendlyButton from "../../calendly-button";

import * as styles from "./features.module.scss";

const cx = classnames.bind(styles);

const features = [
  {
    id: "testrail-cmd-line",
    route: "testrail-cmd-line",
    title: "TestRail Command Line Interface",
    features: [
      "Free version with full access to Railflow Support ",
      "Cross platform CLI for TestRail Cloud and Enterprise",
      "Integrate with any CICD platform and workflows",
      "Installable via NPM and Docker image",
      "Zero-Code. Built-in support for many test frameworks",
    ],
    image: "/images/home_features/cli.webp",
  },
  {
    id: "jenkins-teamcity",
    route: "jenkins-teamcity",
    title: "Jenkins and TeamCity plugins",
    features: [
      "Easy setup using Jenkins and TeamCity plugins",
      "Report CICD Testing metrics into TestRail",
      "Integrate JUnit, TestNG, Cucumber, and many more",
      "Compatible with TestRail On Prem and Cloud ",
    ],
    image: "/images/home_features/jenkins-teamcity.webp",
  },
  {
    id: "gitlab-circleli",
    route: "gitlab-circleli",
    title: "Gitlab, CircleCI, Travis, and others",
    features: [
      "Report CICD Testing metrics into TestRail ",
      "Simple setup using NPM and Docker ",
      "Integrate JUnit, TestNG, Cucumber, and many more",
      "Compatible with TestRail On Prem and Cloud ",
    ],
    image: "/images/home_features/saas-cicd.webp",
  },
  {
    id: "automatic-test-run",
    route: "automatic-test-run",
    title: "Automatic Test, Plan, Run, and Milestone",
    features: [
      " Automatically create Test Suites",
      "Automatically create Test Plans and Runs ",
      "Automatically create Milestones ",
      "Automatically create Configurations",
    ],
    image: "/images/home_features/automatic.webp",
  },
  {
    id: "smart-test",
    route: "smart-test",
    title: "Smart Test Failure Assignment",
    features: [
      "Automatic test failures assignment across users",
      "Improve team productivity and collaboration",
      "Round robin test failures assignment ",
      "Easy and flexible configuration",
    ],
    image: "/images/home_features/smart-assignment-min.webp",
  },
  {
    id: "postman",
    route: "postman",
    title: "Postman API Tests",
    features: [
      "Integrate Postman API tests with TestRail",
      "Dynamic mapping of tests and assertions",
      "Flexible configuration and rules",
      "No need for external newman reporters",
    ],
    image: "/images/home_features/postman-min.webp",
  },
  {
    id: "selenium-webdriver",
    route: "selenium-webdriver",
    title: "Selenium WebDriver Integration ",
    features: [
      "Integrate Selenium Webdriver with JUnit and TestNG",
      "Map Selenium tests to existing tests in TestRail",
      "JAVA and Python SDK for deep integration",
      "Capture screenshots and post them into TestRail",
    ],
    image: "/images/home_features/selenium.webp",
  },
  {
    id: "testrail-cypress",
    route: "testrail-cypress",
    title: "Cypress.IO integration",
    features: [
      "Integrate Cypress.IO tests into TestRail",
      "Map Cypress tests to existing tests in TestRail",
      "Capture screenshots and post them into TestRail",
      "Detailed test steps and assertions results",
    ],
    image: "/images/home_features/cypress.webp",
  },
  {
    id: "testrail-cucumber",
    route: "testrail-cucumber",

    title: "Cucumber & SpecFlow BDD Frameworks",
    features: [
      "Support for two of the most popular BDD frameworks",
      "Reflect Features, Scenarios, and Steps in TestRail",
      "Integrated step level BDD reporting using TestRail",
      "Improve communication between analyst and engineers",
    ],
    image: "/images/home_features/bdd.webp",
  },
  {
    id: "readyapi",
    route: "readyapi",

    title: "ReadyAPI Integration",
    features: [
      "Powerful integration using ReadyAPI Plugin extensions",
      "Map ReadyAPI TestSuite and Tests to TestRail",
      "Capture ReadyAPI request and response to TestRail",
      "Run via ReadyAPI GUI or CLI using CICD",
    ],
    image: "/images/home_features/readyapi-min.webp",
  },
  {
    id: "python-pytest",
    route: "python-pytest",
    title: "Python Pytest",
    features: [
      "Pytest plugin for easy setup and integration",
      "Map pytest tests to existing tests in TestRail",
      "Builtin integration with pytest-splinter",
      "Easy to follow examples on Github",
    ],
    image: "/images/home_features/python.webp",
  },
  {
    id: "java-framework",
    route: "java-framework",
    title: "JAVA TestNG and JUnit",
    features: [
      "JAVA SDK for easy setup and integration",
      "Map testng and junit tests to existing tests in TestRail",
      "Utility classes for automatic screenshot capture",
      "Easy to follow examples on Github",
    ],
    image: "/images/home_features/java.webp",
  },
  {
    id: "msft-test",
    route: "msft-test",
    title: "XUnit, NUnit, and MSTest",
    features: [
      "NET SDK for easy setup using Nuget",
      "Map automation tests to existing tests in TestRail",
      "Utility classes for automatic screenshot capture",
      "Easy to follow examples on Github",
    ],
    image: "/images/home_features/net.webp",
  },
  /*
  {
    id: 'test-cafe',
    route: 'test-cafe',
    title: 'Test Cafe Integration',
    features: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'Exercitationem neque iure explicabo deleniti ',
      'Eos non alias consequuntur sint? Corrupti ',
    ],
    image: featureTestCafe,
  },

  {
    id: 'katalon',
    route: 'katalon',
    title: 'Katalon Integration',
    features: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'Exercitationem neque iure explicabo deleniti ',
      'Eos non alias consequuntur sint? Corrupti ',
    ],
    image: featureKatalon,
  },

  {
    id: 'jira',
    route: 'jira',
    title: 'JIRA Defect Bot',
    features: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'Exercitationem neque iure explicabo deleniti ',
      'Eos non alias consequuntur sint? Corrupti ',
    ],
    image: featureJIRA,
  },
  */
  {
    id: "mapping",
    route: "mapping",
    title: "Automation Test Mapping",
    features: [
      "Map existing automation tests to tests in TestRail",
      "Railflow JAVA, .NET, and Python Test Framework SDK",
      "Improve colloboration betweens engineers and analysts",
      "End to end test tracebility across features and teams",
    ],
    image: "/images/home_features/mapping.webp",
  },
  {
    id: "customer-support",
    route: "customer-support",
    title: "Enterprise Support",
    features: [
      "Got a question? Email, Phone, or Zoom us ",
      "Live talk to our team on Slack",
      "Consulting help for TestRail REST API",
      "Still thinking? Try us free for 14 days",
    ],
    image: "/images/home_features/support.webp",
  },
];

const Features = () => {
  return (
    <section id="features" className={cx("features")}>
      <LayoutSectionContainer>
        {features.map((feature) => (
          <div key={feature.id} className={cx("features_sectionContainer")}>
            <div className={cx("featuresLeft", "features_section")}>
              <h1 className={cx("featuresLeft_title")}>{feature.title}</h1>
              <div className={cx("featuresLeft_text")}>
                <ul>
                  {feature.features.map((featureText, idx) => (
                    <li key={idx}>{featureText}</li>
                  ))}
                </ul>
              </div>
              <div className={cx("features_buttonWrapper")}>
                {/* <Button
                  to={`/features/${feature.route}`}
                  type="button"
                >
                  Learn more
                </Button> */}
                <Button to="/free-cli" type="button">
                  CLI - Free
                </Button>
                <Button to="/register" type="button">
                  Enterprise Trial
                </Button>
                <CalendlyButton />
              </div>
            </div>

            <div className={cx("featuresRight", "features_section")}>
              <div className={cx("featuresRight_image")}>
                <img
                  className={cx('featuresRight_image')}
                  src={feature.image}
                  alt="features"
                />
              </div>
            </div>
          </div>
        ))}
      </LayoutSectionContainer>
    </section>
  );
};

export default Features;
