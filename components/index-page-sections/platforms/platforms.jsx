import React from "react";
import classnames from "classnames/bind";

import { LayoutSectionContainer } from "../../layout";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import dialogImage from "../../../assets/images/integrate_image.png";

import CircleCIImage from "../../../assets/images/circleci.webp";
import JenkinsImage from "../../../assets/images/jenkins.webp";
import JUnitImage from "../../../assets/images/junit.webp";
import PostmanImage from "../../../assets/images/postman.webp";
import TeamCityImage from "../../../assets/images/teamcity.webp";
import ReadyAPIImage from "../../../assets/images/readyapi.webp";
import SeleniumImage from "../../../assets/images/selenium.webp";
import TestNGImage from "../../../assets/images/testng.webp";
import KatalonImage from "../../../assets/images/katalon.webp";

import ArrowRightIcon from "../../../assets/icons/arrow_right.svg";
import * as styles from "./platforms.module.scss";

const cx = classnames.bind(styles);

// TODO: move to constant
const platforms = [
  {
    id: "jenkins",
    title: "Jenkins",
    image: JenkinsImage,
    description:
      "Railflow native Jenkins plugin for easy setup, configuration, and integration of Jenkins jobs with TestRail",
  },
  {
    id: "teamcity",
    title: "TeamCity",
    image: TeamCityImage,
    description:
      "Railflow native Teamcity plugin for easy setup, configuration, and integration of TeamCity jobs with TestRail",
  },
  {
    id: "circleci",
    title: "CircleCI",
    image: CircleCIImage,
    description:
      "Railflow NPM package and Docker image makes CircleCI integration with TestRail a breeze. Get up and running in 5 mins",
  },
  {
    id: "postman",
    title: "Postman",
    image: PostmanImage,
    description:
      "Railflow's Postman integration is different than all the other open source and unsupported solutions. Come see how our flexible approach can help your teams",
  },
  {
    id: "readyapi",
    title: "ReadyAPI",
    image: ReadyAPIImage,
    description:
      "Railflow uses ReadyAPIs incredible plugin architecture and exposes a highly integrated UI based TestRail configuration panel. Truely the best and only solution.",
  },
  {
    id: "katalon",
    title: "Katalon",
    image: KatalonImage,
    description:
      "Railflow uses Katalons plugin SDK to expose a highly integrated TestRail configuration panel with the same powerful features as in all other Railflow integrations. ",
  },
  {
    id: "selenium",
    title: "Selenium",
    image: SeleniumImage,
    description:
      "Create powerful Selenium tests that can automtically take screenshots upon failure and post the results and history to TestRail.",
  },
  {
    id: "junit",
    title: "JUnit",
    image: JUnitImage,
    description:
      "Use Railflow's JUNIT annotations SDK to map junit tests to existing tests in TestRail, define custom fields, map muliple tests to a single test, and much more",
  },
  {
    id: "testng",
    title: "TestNG",
    image: TestNGImage,
    description:
      "Use Railflow's TestNG annotations SDK to map TestNG tests to existing tests in TestRail, define custom fields, map muliple tests to a single test, and much more",
  },
];

const Platforms = () => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <section id="platforms" className={cx("platforms")}>
      <h1 className={cx("platforms_title")}>
        Railflow easily integrates with your favorite CICD Tools{" "}
      </h1>

      <LayoutSectionContainer>
        <div className={cx("platformsGrid")}>
          {platforms.map(({ image: Image, ...platform }) => (
            <div key={platform.id} className={cx("platformsGridPlatform")}>
              <div className={cx("platformsGridPlatform_topContainer")}>
                {typeof Image === "string" ? (
                  <img
                    src={Image}
                    alt={platform.title}
                    className={cx("platformsGridPlatform_image")}
                  />
                ) : (
                  <Image className={cx("platformsGridPlatform_image")} />
                )}

                <h2 className={cx("platformsGridPlatform_title")}>
                  {platform.title}
                </h2>
              </div>
              <p className={cx("platformsGridPlatform_description")}>
                {platform.description}
              </p>

              <a
                rel="noopener noreferrer"
                target="_blank"
                href={"https://docs.railflow.io"}
                className={cx("platformsGridPlatformLink")}
              >
                Railfllow Docs
                <ArrowRightIcon
                  className={cx("platformsGridPlatformLink_icon")}
                />
              </a>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
      <Dialog onClose={() => setDialogOpen(false)} open={isDialogOpen}>
        <MuiDialogTitle>
          <Typography variant="h6">Coming very soon</Typography>
          <IconButton
            aria-label="close"
            className={cx("platforms_dialogCloseIcon")}
            onClick={() => setDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent>
          <img
            alt="Coming very soon"
            className={cx("platforms_dialogImage")}
            src={dialogImage}
          />
          <DialogContentText>
            We are working hard on these awesome integrations. Leave us a note
            in our chat bot to get notified.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Platforms;
