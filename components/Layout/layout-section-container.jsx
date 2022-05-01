import React from "react";
import classnames from "classnames/bind";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutSectionContainer = (props) => {
  const { children, fluid } = props;

  return (
    <div
      className={cx("layoutSectionContainer", {
        layoutSectionContainer_fluid: !!fluid,
      })}
    >
      {children}
    </div>
  );
};

export default LayoutSectionContainer;
