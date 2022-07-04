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
        <img src="/images/lock.png" alt="lock" height={20} width={20} style={{margin: "0px 0px 0px 8px"}}></img>
      </button>
    ),
    [onClick, type, isDisabled, inverse, className, children]
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
  inverse: false,
};

export default Button;
