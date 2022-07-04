import React, { useMemo } from "react";
import Link from "next/link";
import classnames from "classnames/bind";

import * as styles from "./quotebutton.module.scss";

const cx = classnames.bind(styles);

const Button = (props) => {
  const { onClick, to, type, isDisabled, className, children } = props;

  const buttonComponent = useMemo(
    () => (
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className={cx("button")}
      >
        {children}
      </button>
    ),
    [onClick, type, isDisabled, className, children]
  );

  return to ? (
    <Link href={to} passHref>
      <a className={cx("linkButton")}>{buttonComponent}</a>
    </Link>
  ) : ( 
    buttonComponent
  );
};

Button.defaultProps = {
  to: null,
  type: "button",
};

export default Button;
