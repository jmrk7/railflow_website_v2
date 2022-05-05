import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import * as styles from "./feature-list.module.scss";

const cx = classnames.bind(styles);

const FeatureList = ({ feature }) => {
  const { featureList } = feature;
  return (
    <section id="feature-list" className={cx("featureList")}>
      <LayoutSectionContainer>
        {featureList.map((feature) => (
          <div key={feature.id} className={cx("featureList_sectionContainer")}>
            <div className={cx("featureListLeft", "featureList_section")}>
              <h1 className={cx("featureListLeft_title")}>{feature.title}</h1>
              <p className={cx("featureListLeft_text")}>{feature.text}</p>
            </div>
            <div className={cx("featureListRight", "featureList_section")}>
              <div className={cx("featureListRight_image")}>
                <Image src={feature.image} alt="features" />
              </div>
            </div>
          </div>
        ))}
      </LayoutSectionContainer>
    </section>
  );
};

export default FeatureList;
