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
    name: 'Railflow NPM CLI - 2.1.17',
    features: [
      {
        text: '[feature] Add support for Playwright reports',
      },
      {
        text: '[feature] Add a new `JUnit-Steps` report type',
      },
      {
        text: '[feature] Add `--attachment-max-size` switch for limiting attachment size',
      },
      {
        text: '[feature] Add `--attachment-type-whitelist` and `--attachment-type-blacklist` switches for limiting attachment types allowed to be uploaded',
      },
      {
        text: '[feature] Improve logging',
      },
      {
        text: '[bug] Duplicate test cases/sections are created when test report contains sections with the same name',
      },
      {
        text: '[bug] Railflow ignores license file if `RAILFLOW_LICENSE` environment variable is set',
      },
    ],
    downloadUrl: "https://www.npmjs.com/package/railflow",
    image: NpmImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: 'docker',
    name: 'Railflow Docker Image - 2.1.17',
    features: [
      {
        text: '[feature] Add support for Playwright reports',
      },
      {
        text: '[feature] Add a new `JUnit-Steps` report type',
      },
      {
        text: '[feature] Add `--attachment-max-size` switch for limiting attachment size',
      },
      {
        text: '[feature] Add `--attachment-type-whitelist` and `--attachment-type-blacklist` switches for limiting attachment types allowed to be uploaded',
      },
      {
        text: '[feature] Improve logging',
      },
      {
        text: '[bug] Duplicate test cases/sections are created when test report contains sections with the same name',
      },
      {
        text: '[bug] Railflow ignores license file if `RAILFLOW_LICENSE` environment variable is set',
      },
    ],
    downloadUrl: "https://hub.docker.com/r/railflow/railflow",
    image: DockerImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: 'readyapi',
    name: 'ReadyApi plugin - 2.2',
    features: [
      {
        text: '[bug] Fix license activation for auto-generated trial licenses',
      }
    ],
    downloadUrl: "",
    downloadItem: [
      {
        text: 'Windows Installer',
        img: "/images/windows.png",
        alt: "windows",
        id: "Readyapi-Windows",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.2/Railflow_windows-x64_2.2.exe"
      },
      {
        text: 'Mac OS Installer',
        img: "/images/apple_white.png",
        id: "Readyapi-Mac",
        alt: "MacOS",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.2/Railflow_macos_2.2.dmg"
      },
      {
        text: 'Linux Installer',
        img: "/images/linux.png",
        id: "Readyapi-Linux",
        alt: "Linux",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.2/railflow-readyapi-plugin-2.2-distribution.jar"
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

            <div>
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
