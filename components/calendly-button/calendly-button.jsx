import React from "react";
import Button from "../button";
import classnames from "classnames/bind";

import * as styles from "./calendly-button.module.scss";

const cx = classnames.bind(styles);

const CalendlyButton = () => {
  return (
    <a
      href={"https://calendly.com/railflow"}
      rel="noopener noreferrer"
      target="_blank"
      className={cx("calendlyButton")}
    >
      <Button>Schedule Demo</Button>
    </a>
  );
};

export default CalendlyButton;
