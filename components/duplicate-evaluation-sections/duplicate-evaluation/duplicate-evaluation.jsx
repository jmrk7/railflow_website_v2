import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import * as styles from "./duplicate-evaluation.module.scss";

import duplicateEvaluationImage from "../../../public/images/giphy-cat.webp";

const cx = classnames.bind(styles);

const DuplicateEvaluation = () => {
  return (
    <section id="duplicate-evaluation" className={cx("duplicateEvaluation")}>
      <LayoutSectionContainer>
        <div className={cx("duplicateEvaluation_sectionContainer")}>
          <h1 className={cx("duplicateEvaluation_title")}>
            Duplicate Evaluation Request
          </h1>
          <div className={cx("duplicateEvaluation_text")}>
            <div>
              Our records show that you have already registered and evaluated
              Railflow. If you need to extend your evaluation or if you did not
              receive the license, please send us a note via the support portal{" "}
              <a
                rel="noopener noreferrer"
                href="https://railflow.atlassian.net/servicedesk/customer/portal/1"
                target="_blank"
              >
                support portal
              </a>
              .
            </div>
          </div>
          <div className={cx("duplicateEvaluation_image")}>
            <Image src={duplicateEvaluationImage} alt="cat" />
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default DuplicateEvaluation;
