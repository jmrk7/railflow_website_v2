import React from "react";
import classnames from "classnames/bind";

import { LayoutSectionContainer } from "../../Layout";
import DownloadListItem from "../download-list-item";

import JenkinsImage from "../../../public/images/jenkins.png";
import TeamCityImage from "../../../public/images/teamcity.png";
import ReadyAPIImage from "../../../public/images/readyapi.png";
import NPMImage from "../../../public/images/npm.png";
import DockerImage from "../../../public/images/docker-2.png";

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
    image: JenkinsImage,
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
    image: TeamCityImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/teamcity",
    hashes: true,
  },
  {
    id: "NPM",
    name: "Railflow NPM CLI - 2.1.9",
    features: [
      {
        text: "[feature] Add new `--untested-status` CLI switch for providing a name of the status to use in TestRail for untested/skipped tests",
      },      
    ],
    downloadUrl: "https://www.npmjs.com/package/railflow",
    image: NPMImage,
    releaseNotesUrl: "https://docs.railflow.io/docs/release-notes/cli",
    hashes: false,
  },
  {
    id: "Docker",
    name: "Railflow Docker Image - 2.1.9",
    features: [
      {
        text: "[feature] Add new `--untested-status` CLI switch for providing a name of the status to use in TestRail for untested/skipped tests",
      },
    ],
    downloadUrl: "https://hub.docker.com/r/railflow/railflow",
    image: DockerImage,
    releaseNotesUrl: "",
    hashes: false,
  },
  {
    id: "Readyapi",
    name: "Readyapi plugin - Coming soon!",
    features: [
      {
        text: "Coming Soon",
      },
    ],
    downloadUrl: "#download",
    image: ReadyAPIImage,
    releaseNotesUrl: "",
    hashes: false,
  },
];

const DownloadPosts = () => {
  return (
    <section id="download-posts" className={cx("downloadPosts")}>
      <LayoutSectionContainer>
        <div className={cx("downloadPosts_sectionContainer")}>
          <div className={cx("downloadPosts_section")}>
            <h1 className={cx("downloadPosts_title")}>Railflow Downloads</h1>

            <div className={cx("downloadPosts_list")}>
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
