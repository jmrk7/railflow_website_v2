import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";

import featureDefaultImage from "../../../public/images/feature-image-default.jpeg";
import featureGithub from "../../../public/images/home_features/saas-cicd.webp";
import featureTeamcity from "../../../public/images/home_features/jenkins-teamcity.webp";
import featurePostman from "../../../public/images/home_features/postman-min.webp";
import featureSmart from "../../../public/images/home_features/smart-assignment-min.webp";
import featureReadyApi from "../../../public/images/home_features/readyapi-min.webp";
import featureKatalon from "../../../public/images/home_features/katalon-min.webp";
import featureCLI from "../../../public/images/home_features/cli.webp";
import featureJava from "../../../public/images/home_features/java.webp";
import featureSelenium from "../../../public/images/home_features/selenium.webp";
import featurePython from "../../../public/images/home_features/python.webp";
import featureNET from "../../../public/images/home_features/net.webp";
import featureCypress from "../../../public/images/home_features/cypress.webp";
import featureSupport from "../../../public/images/home_features/support.webp";
import featureMapping from "../../../public/images/home_features/mapping.webp";
import featureBDD from "../../../public/images/home_features/bdd.webp";
import featureAutomatic from "../../../public/images/home_features/automatic.webp";

import Button from "../../button";
import CalendlyButton from "../../calendly-button";

import * as styles from "./features.module.scss";

const cx = classnames.bind(styles);

const features = [
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
    image: featureTeamcity,
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
    image: featureGithub,
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
    image: featureAutomatic,
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
    image: featureSmart,
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
    image: featurePostman,
  },
  {
    id: "testrail-cmd-line",
    route: "testrail-cmd-line",
    title: "TestRail Command Line Interface",
    features: [
      "Cross platform CLI for TestRail Cloud and Enterprise",
      "Integrate with any CICD platform and workflows",
      "Installable via NPM and Docker image",
      "Zero-Code. Built-in support for many test frameworks",
    ],
    image: featureCLI,
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
    image: featureSelenium,
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
    image: featureCypress,
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
    image: featureBDD,
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
    image: featureReadyApi,
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
    image: featurePython,
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
    image: featureJava,
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
    image: featureNET,
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
    image: featureMapping,
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
    image: featureSupport,
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
                <Button to="/register" type="button">
                  Sign up
                </Button>
                <CalendlyButton />
              </div>
            </div>

            <div className={cx("featuresRight", "features_section")}>
              <div className={cx("featuresRight_image")}>
                <Image src={feature.image} alt="features" />
              </div>
            </div>
          </div>
        ))}
      </LayoutSectionContainer>
    </section>
  );
};

export default Features;
