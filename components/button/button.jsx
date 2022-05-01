import React, { useMemo } from "react";
import Link from "next/link";
import classnames from "classnames/bind";

import * as styles from "./button.module.scss";

const cx = classnames.bind(styles);

const Button = (props) => {
  const { onClick, to, type, isDisabled, inverse, className, children } = props;

  const buttonComponent = useMemo(
    () => (
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className={cx("button", {
          button__inverse: !!inverse,
          [className]: true,
        })}
      >
        {children}
      </button>
    ),
    [onClick, type, isDisabled, inverse, className, children]
  );

  return to ? (
    <Link href={to} className={cx("linkButton")}>
      {buttonComponent}
    </Link>
  ) : (
    buttonComponent
  );
};

Button.defaultProps = {
  to: null,
  type: "button",
  inverse: false,
};

export default Button;
