import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../layout";
import * as styles from "./description.module.scss";

const cx = classnames.bind(styles);

const Description = () => {
  return (
    <section id="description" className={cx("description")}>
      <LayoutSectionContainer>
        <div className={cx("description_sectionContainer")}>
          <h1 className={cx("description_title")}>About Railflow</h1>
        </div>
        <section className={cx("description_section")}>
          <div className={cx("description_about")}>
            <div className={cx("description_aboutLeft")}>
              <div className={cx("description_text")}>
                <p>
                  Railflow is a spin off company from{" "}
                  <a href="https://agiletestware.com">Agiletestware</a>. We have
                  been in operation since 2010 and currently head quartered in
                  beautiful San Francisco. Raillow, like its sister company, is
                  focued on developer productivity. Railflow is unique in the
                  sense that we are only focused on a single mission: Help
                  TestRail users/customers get the most out of their TestRail
                  investment.
                </p>
                <p>
                  To help realize this mission, Railflow develops a variety of
                  solutions for test frameworks, CICD application, integration
                  libraries, command line interfaces, workaround for TestRail
                  API issues, and even offers TestRail and test automation
                  consulting. We have been using TestRail for 15+ years and know
                  TestRail inside out. If you need something done, there is no
                  one better than our team at Railflow.
                </p>

                <p>
                  We think TestRail is one of the best test case management
                  solutions in the market. We want to help you realize the full
                  potential of TestRail by integrating your engineering
                  processes with little to zero coding. We do all the TestRail
                  automation heavy lifting so that you can focus on your real
                  work.
                </p>
              </div>
            </div>
            <div className={cx("description_aboutRight")}>
              <Image
                src={"/images/aboutus_image.jpeg"}
                alt="About Railflow"
                width={535}
                height={401}
              />
            </div>
          </div>
        </section>
      </LayoutSectionContainer>
      <LayoutSectionContainer fluid>
        <section className={cx("description_section")}>
          <div className={cx("description_metrics")}>
            <div className={cx("description_metricsTitle")}>
              Over 100+ companies across 20 countries use Agiletestware/Railflow
              tools
            </div>
            <div className={cx("description_metricsRow")}>
              <div className={cx("description_metric")}>
                <div className={cx("description_metricBig")}>LOTS</div>
                <div className={cx("description_metricSmall")}>users</div>
              </div>
              <div className={cx("description_metric")}>
                <div className={cx("description_metricBig")}>100+</div>
                <div className={cx("description_metricSmall")}>companies</div>
              </div>
              <div className={cx("description_metric")}>
                <div className={cx("description_metricBig")}>20+</div>
                <div className={cx("description_metricSmall")}>countries</div>
              </div>
            </div>
          </div>
        </section>
      </LayoutSectionContainer>
    </section>
  );
};

export default Description;
