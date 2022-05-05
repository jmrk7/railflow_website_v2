import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import * as styles from "./hero.module.scss";
import dashboardImg from "../../../public/images/dashboard.png";

const cx = classnames.bind(styles);

const FeatureHero = ({ feature }) => {
  const { heroTitle, heroText } = feature;
  return (
    <section id="feature-hero" className={cx("featureHero")}>
      <LayoutSectionContainer>
        <div className={cx("featureHero_sectionContainer")}>
          <div className={cx("featureHero_section")}>
            <div className={cx("featureHero_image")}>
              <Image src={dashboardImg} alt="dashboard" />
            </div>
          </div>
          <div className={cx("featureHero_section")}>
            <h1 className={cx("featureHero_title")}>{heroTitle}</h1>
            <p className={cx("featureHero_text")}>{heroText}</p>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default FeatureHero;
