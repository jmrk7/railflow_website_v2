import React, { useState } from "react";
import Router from "next/router";

import classnames from "classnames/bind";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutHeaderSubLink = ({ dropdownLink }) => {
  const [isOpened, setOpened] = useState(true);

  const mouseEnter = () => {
    setOpened(false);
  };
  const mouseLeave = () => {
    setOpened(true);
  };
  const goTarget = (value) => {
    Router.push(value.to);
  };

  return (
    <div
      className={cx("layoutHeaderLinkDropdown_link")}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div
        className={cx("layoutHeaderLinkDropdown")}
        style={{
          position: "absolute",
          right: "0",
          top: "-46px",
          bottom: "auto",
          left: "auto",
          width: "190px",
          marginRight: "-190px",
          marginTop: "-46px",
          display: !isOpened ? "flex" : "none",
        }}
      >
        {dropdownLink.items.map((value) => {
          return value.isExternal ? (
            <a
              rel="noopener noreferrer"
              key={value.id}
              href={value.to}
              className={cx("layoutHeaderLinkDropdown_link")}
              target="_blank"
              style={{ padding: "12px 24px" }}
            >
              {value.label}
            </a>
          ) : (
            <a
              rel="noopener noreferrer"
              key={value.id}
              onClick={() => goTarget(value)}
              className={cx("layoutHeaderLinkDropdown_link")}
              style={{ padding: "12px 24px" }}
            >
              {value.label}
            </a>
          );
        })}
      </div>
      {dropdownLink.label}
      <img
        src="/icons/sort.svg"
        width={10}
        height={8}
        alt="sort"
        style={{
          marginLeft: "8px",
          transform: isOpened ? "rotate(90deg)" : "rotate(270deg)",
          transition: "0.25s transform",
        }}
      />
    </div>
  );
};

export default LayoutHeaderSubLink;
