import React from "react";
import classnames from "classnames/bind";

import {LayoutSectionContainer} from "../../Layout";
import DownloadListItem from "../download-list-item";

import * as styles from "./download-posts.module.scss";
import JenkinsImage from "/public/images/jenkins.png";
import TeamCityImage from "/public/images/teamcity.png";
import NpmImage from "/public/images/npm.png";
import DockerImage from "/public/images/docker-2.png";
import ReadyApiImage from "/public/images/readyapi.png";

const cx = classnames.bind(styles);

export const downloads = [
  {
    id: 'jenkins',
    name: 'Jenkins plugin - 2.4',
    features: [
      {
        text: '[feature] Pytest reports: add support for custom test steps',
      },
      {
        text: '[feature] Robot reports: map robot tests into existing TestRail test cases by reading ID from "testrail.id" tag in robot report',
      },
      {
        text: '[feature] Set case title into the field defined by "Case Search Field" parameter on case creation',
      },
      {
        text: '[feature] Cucumber reports: Do not create separate steps for before/after hooks',
      },
      {
        text: '[feature] Cucumber reports: Add ability to map cucumber tests into existing test cases in TestRail by providing the ID in "testrail.id" cucumber tag',
      },
      {
        text: '[feature] Robot reports: Add only fail and warn messages into step\'s "Actual" field',
      },
      {
        text: '[feature] Allure reports: Add ability to map allure tests into existing test cases in TestRail by providing the ID in "testrail.id" tag',
      },
      {
        text: '[bug] "JSONObject["jobConfigurations"] is not a JSONObject" error while saving multiple Railflow upload configurations',
      },
      {
        text: '[bug] Robot reports: incorrect calculation of Elapsed time',
      },
      {
        text: '[bug] Pytest reports: failed tests in one class are always assigned to the first user from the list',
      },
      {
        text: '[bug] Cannot set value for custom multiselect field',
      },
    ],
    downloadUrl:
      "https://railflow.sfo3.digitaloceanspaces.com/downloads/railflow-jenkins-plugin/2.4/railflow-jenkins-plugin.hpi",
    image: JenkinsImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/jenkins",
    hashes: true,
  },
  {
    id: 'teamcity',
    name: 'TeamCity Plugin - 2.5',
    features: [
      {
        text: '[feature] Pytest reports: add support for custom test steps',
      },
      {
        text: '[feature] Robot reports: map robot tests into existing TestRail test cases by reading ID from "testrail.id" tag in robot report',
      },
      {
        text: '[feature] Set case title into the field defined by "Case Search Field" parameter on case creation',
      },
      {
        text: '[feature] Cucumber reports: Do not create separate steps for before/after hooks',
      },
      {
        text: '[feature] Cucumber reports: Add ability to map cucumber tests into existing test cases in TestRail by providing the ID in "testrail.id" cucumber tag',
      },
      {
        text: '[feature] Robot reports: Add only fail and warn messages into step\'s "Actual" field',
      },
      {
        text: '[feature] Allure reports: Add ability to map allure tests into existing test cases in TestRail by providing the ID in "testrail.id" tag',
      },
      {
        text: '[bug] Robot reports: incorrect calculation of Elapsed time',
      },
      {
        text: '[bug] Pytest reports: failed tests in one class are always assigned to the first user from the list',
      },
      {
        text: '[bug] Cannot set value for custom multiselect field',
      },
    ],
    downloadUrl:
      "https://railflow.sfo3.digitaloceanspaces.com/downloads/railflow-teamcity-plugin/2.5/railflow-testrail-addon.zip",
    image: TeamCityImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/teamcity",
    hashes: true,
  },
  {
    id: 'npm',
    name: 'Railflow NPM CLI - 2.1.11',
    features: [
      {
        text: '[feature] Robot: Read test case ID from `testrail.id` tag',
      },
      {
        text: '[feature] Add new RAILFLOW_TR_URL environment variable',
      },
      {
        text: '[bug] Cucumber: Data tables should be displayed in test steps',
      },
      {
        text: '[bug] Cucumber: "TypeError: The "data" argument must be of type string or an instance.... Received undefined" error',
      },
      {
        text: '[bug] Cannot set value for custom multiselect field',
      },
      {
        text: '[bug] When project does not have users and Smart Failure Assignment is set, no warning is displayed',
      },
      {
        text: '[bug] "error data: Field :custom_required_field is a required field" is displayed instead of a nice validation error message when user provides empty value for a required field',
      },
    ],
    downloadUrl: "https://www.npmjs.com/package/railflow",
    image: NpmImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: 'docker',
    name: 'Railflow Docker Image - 2.1.11',
    features: [
      {
        text: '[feature] Robot: Read test case ID from `testrail.id` tag',
      },
      {
        text: '[feature] Add new RAILFLOW_TR_URL environment variable',
      },
      {
        text: '[bug] Cucumber: Data tables should be displayed in test steps',
      },
      {
        text: '[bug] Cucumber: "TypeError: The "data" argument must be of type string or an instance.... Received undefined" error',
      },
      {
        text: '[bug] Cannot set value for custom multiselect field',
      },
      {
        text: '[bug] When project does not have users and Smart Failure Assignment is set, no warning is displayed',
      },
      {
        text: '[bug] "error data: Field :custom_required_field is a required field" is displayed instead of a nice validation error message when user provides empty value for a required field',
      },
    ],
    downloadUrl: "https://hub.docker.com/r/railflow/railflow",
    image: DockerImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: 'readyapi',
    name: 'ReadyApi plugin - 2.1',
    features: [
      {
        text: '[feature] Add license activation screen into the installer',
      },
      {
        text: '[feature] Add a new "TR_update_cases" property which tells testrunner and testengine to export test cases into TestRail instead of running it',
      },
    ],
    downloadUrl: "",
    downloadItem: [
      {
        text: 'Windows Installer',
        img: "/images/windows.png",
        alt: "windows",
        id: "Readyapi-Windows",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/railflow-readyapi-plugin-2.1-distribution.jar"
      },
      {
        text: 'Mac OS Installer',
        img: "/images/apple_white.png",
        id: "Readyapi-Mac",
        alt: "MacOS",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/Railflow_macos_2.1.dmg"
      },
      {
        text: 'Linux Installer',
        img: "/images/linux.png",
        id: "Readyapi-Linux",
        alt: "Linux",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/railflow-readyapi-plugin-2.1-distribution.jar"
      }
    ],
    image: ReadyApiImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/readyapi",
    hashes: false,
  },
];

const DownloadPosts = () => {
  return (
    <section id="download-posts" className={cx('downloadPosts')}>
      <LayoutSectionContainer>
        <div className={cx('downloadPosts_sectionContainer')}>
          <div className={cx('downloadPosts_section')}>
            <h1 className={cx('downloadPosts_title')}>
              Railflow Downloads
            </h1>

            <div className={cx('downloadPosts_list')}>
              {downloads.map((item) => (
                <DownloadListItem key={item.id} download={item} />
              ))}
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default DownloadPosts;
