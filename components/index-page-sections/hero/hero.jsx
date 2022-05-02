import React, { useCallback } from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../layout";
import Button from "../../button";

import * as styles from "./hero.module.scss";

const cx = classnames.bind(styles);

const Hero = () => {
  const handleClickFeaturesButton = useCallback(() => {
    const featuresSectionElement = document.getElementById("features");

    if (featuresSectionElement) {
      featuresSectionElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section id="hero" className={cx("hero")}>
      <LayoutSectionContainer>
        <div className={cx("hero_sectionContainer")}>
          <div className={cx("heroLeft", "hero_section")}>
            <h1 className={cx("heroLeft_title")}>
              TestRail Integration Platform and Tools
            </h1>
            <div className={cx("heroLeft_text")}>
              <ul>
                <li>Integrate TestRail with any CICD platform</li>
                <li>Centralized test reporting using TestRail</li>
                <li>Support for countless testing tools and frameworks</li>
                <li>Zero coding. Up and running in 5 minutes</li>
                <li>Super charge quality engineering productivity</li>
                <li>Try Railflow free for 14 days. Satisfaction guaranteed</li>
              </ul>
            </div>

            <div className={cx("heroLeft_buttonContainer")}>
              <Button
                onClick={handleClickFeaturesButton}
                className={cx("heroLeft_button")}
              >
                Explore Features
              </Button>
              {/* TODO: place "See How It Works" video opening button */}
            </div>
          </div>

          <div className={cx("heroRight", "hero_section")}>
            <div className={cx("heroRight_image")}>
              <Image
                src={"/images/main_testrail.webp"}
                alt="testrail"
                width={610}
                height={470}
              />
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default Hero;
