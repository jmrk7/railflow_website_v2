import React from "react";
import classnames from "classnames/bind";

import { LayoutSectionContainer } from "../../Layout";
import DownloadListItem from "../download-list-item";

import * as styles from "./download-posts.module.scss";

const cx = classnames.bind(styles);

export const downloads = [
  {
    id: "Jenkins",
    name: "Jenkins plugin - 2.3",
    features: [
      {
        text: "[feature] Add support for Robot native reports",
      },
      {
        text: "[feature] Add support for custom Railflow Python reports (https://docs.railflow.io/docs/testing-frameworks/pytest)",
      },
      {
        text: "[feature] Add support for SpecFlow NUnit reports",
      },
      {
        text: "[feature] Add support for customized xUnit reports (https://github.com/railflow/railflow-xunit-examples)",
      },
      {
        text: "[feature] Add support for custom MSTest (TRX) reports (https://github.com/railflow/railflow-mstest-examples)",
      },
      {
        text: '[feature] Add "Fully Qualified Test Name" parameter which allows exporting fully qualified test names into TestRail',
      },
      {
        text: '[feature] Add "Case Search Field" parameter which allows Railflow to search for existing tests cases by the value of some custom field',
      },
      {
        text: "[feature] Railflow searches for the existing tests in TestRail in case-insensitive way",
      },
      {
        text: '[feature] Add "Upload Mode" parameter which controls whether Railflow should create new tests and update existing tests in TestRail',
      },
      {
        text: "[bug] MSTest (TRX) reports: incorrect handling of Smart Failure Assignment from the report",
      },
    ],
    downloadUrl:
      "https://railflow.sfo3.digitaloceanspaces.com/downloads/railflow-jenkins-plugin/2.3/railflow-jenkins-plugin.hpi",
    image: "/images/jenkins.png",
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/jenkins",
    hashes: true,
  },
  {
    id: "Teamcity",
    name: "TeamCity Plugin - 2.3",
    features: [
      {
        text: "[feature] Add support for Robot native reports",
      },
      {
        text: "[feature] Add support for custom Railflow Python reports (https://docs.railflow.io/docs/testing-frameworks/pytest)",
      },
      {
        text: "[feature] Add support for SpecFlow NUnit reports",
      },
      {
        text: "[feature] Add support for customized xUnit reports (https://github.com/railflow/railflow-xunit-examples)",
      },
      {
        text: "[feature] Add support for custom MSTest (TRX) reports (https://github.com/railflow/railflow-mstest-examples)",
      },
      {
        text: '[feature] Add "Fully Qualified Test Name" parameter which allows exporting fully qualified test names into TestRail',
      },
      {
        text: '[feature] Add "Case Search Field" parameter which allows Railflow to search for existing tests cases by the value of some custom field',
      },
      {
        text: "[feature] Railflow searches for the existing tests in TestRail in case-insensitive way",
      },
      {
        text: '[feature] Add "Upload Mode" parameter which controls whether Railflow should create new tests and update existing tests in TestRail',
      },
      {
        text: "[bug] MSTest (TRX) reports: incorrect handling of Smart Failure Assignment from the report",
      },
    ],
    downloadUrl:
      "https://railflow.sfo3.digitaloceanspaces.com/downloads/railflow-teamcity-plugin/2.3/railflow-teamcity-testrail-connector.zip",
    image: "/images/teamcity.png",
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/teamcity",
    hashes: true,
  },
  {
    id: "NPM",
    name: "Railflow NPM CLI - 2.1.10",
    features: [
      {
        text: "[feature] Set test case title into the field defined by -csf parameter on test case creation",
      },      
    ],
    downloadUrl: "https://www.npmjs.com/package/railflow",
    image: "/images/npm.png",
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: "Docker",
    name: "Railflow Docker Image - 2.1.10",
    features: [
      {
        text: "[feature] Set test case title into the field defined by -csf parameter on test case creation",
      },
    ],
    downloadUrl: "https://hub.docker.com/r/railflow/railflow",
    image: "/images/docker-2.png",
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: "Readyapi",
    name: "ReadyApi plugin - 2.1",
    features: [
      {
        text: "[feature] Add license activation screen into the installer",
      },
      {
        text: '[feature] Add a new "TR_update_cases" property which tells testrunner and testengine to export test cases into TestRail instead of running it'
      },
    ],
    downloadUrl: "",
    downloadItem: [
      {
        text: 'Windows Installer',
        img: "/images/windows.png",
        alt: "windows",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/railflow-readyapi-plugin-2.1-distribution.jar"
      },
      {
        text: 'Mac OS Installer',
        img: "/images/apple_white.png",
        alt: "MacOS",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/Railflow_macos_2.1.dmg"
      },
      {
        text: 'Linux Installer',
        img: "/images/linux.png",
        alt: "Linux",
        href: "https://railflow.sfo3.digitaloceanspaces.com/downloads/ready-api-plugin/2.1/railflow-readyapi-plugin-2.1-distribution.jar"
      }
    ],
    image: "/images/readyapi.png",
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
