import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import CircleCIImage from '../../../public/images/circleci.webp';
import JenkinsImage from '../../../public/images/jenkins.webp';
import JUnitImage from '../../../public/images/junit.webp';
import PostmanImage from '../../../public/images/postman.webp';
import TeamCityImage from '../../../public/images/teamcity.webp';
import ReadyAPIImage from '../../../public/images/readyapi.webp';
import SeleniumImage from '../../../public/images/selenium.webp';
import TestNGImage from '../../../public/images/testng.webp';
import KatalonImage from '../../../public/images/katalon.webp';

import ArrowRightIcon from "../../../public/icons/arrow_right.svg";
import DialogImage from "../../../public/images/integrate_image.png";

import * as styles from "./platforms.module.scss";

const cx = classnames.bind(styles);

// TODO: move to constant
const platforms = [
  {
    id: 'jenkins',
    title: 'Jenkins',
    image: JenkinsImage,
    description:
      'Railflow native Jenkins plugin for easy setup, configuration, and integration of Jenkins jobs with TestRail',
  },
  {
    id: 'teamcity',
    title: 'TeamCity',
    image: TeamCityImage,
    description:
      'Railflow native Teamcity plugin for easy setup, configuration, and integration of TeamCity jobs with TestRail',
  },
  {
    id: 'circleci',
    title: 'CircleCI',
    image: CircleCIImage,
    description:
      'Railflow NPM package and Docker image makes CircleCI integration with TestRail a breeze. Get up and running in 5 mins',
  },
  {
    id: 'postman',
    title: 'Postman',
    image: PostmanImage,
    description:
      "Railflow's Postman integration is different than all the other open source and unsupported solutions. Come see how our flexible approach can help your teams",
  },
  {
    id: 'readyapi',
    title: 'ReadyAPI',
    image: ReadyAPIImage,
    description:
      'Railflow uses ReadyAPIs incredible plugin architecture and exposes a highly integrated UI based TestRail configuration panel. Truely the best and only solution.',
  },
  {
    id: 'katalon',
    title: 'Katalon',
    image: KatalonImage,
    description:
      'Railflow uses Katalons plugin SDK to expose a highly integrated TestRail configuration panel with the same powerful features as in all other Railflow integrations. ',
  },
  {
    id: 'selenium',
    title: 'Selenium',
    image: SeleniumImage,
    description:
      'Create powerful Selenium tests that can automtically take screenshots upon failure and post the results and history to TestRail.',
  },
  {
    id: 'junit',
    title: 'JUnit',
    image: JUnitImage,
    description:
      "Use Railflow's JUNIT annotations SDK to map junit tests to existing tests in TestRail, define custom fields, map muliple tests to a single test, and much more",
  },
  {
    id: 'testng',
    title: 'TestNG',
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
          {platforms.map(({ image, ...platform }) => (
            <div key={platform.id} className={cx("platformsGridPlatform")}>
              <div className={cx("platformsGridPlatform_topContainer")}>
                <div className={cx("platformsGridPlatform_image")}>
                  <Image src={image} alt={platform.title} />
                </div>

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
                <div className={cx("platformsGridPlatformLink_icon")}>
                  <Image src={ArrowRightIcon} alt="Right Arrow Icon" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
      <Dialog onClose={() => setDialogOpen(false)} open={isDialogOpen}>
        <DialogTitle>
          <Typography variant="h6">Coming very soon</Typography>
          <IconButton
            aria-label="close"
            className={cx("platforms_dialogCloseIcon")}
            onClick={() => setDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={cx("platforms_dialogImage")}>
            <Image alt="Coming very soon" src={DialogImage} />
          </div>
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
