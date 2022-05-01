import React, { useCallback, useMemo, useRef } from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import onEnterKeyDown from "../../utils/on-enter-key-down";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutHeaderLink = (props) => {
  const {
    id,
    label,
    to,
    isExternal,
    dropdownLinks,
    isActive,
    isDropdownOpen,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const dropdownRef = useRef();

  const hasDropdown = useMemo(
    () => !!(dropdownLinks && dropdownLinks.length),
    [dropdownLinks]
  );

  const handleMouseEnter = useCallback(
    (event) => {
      onMouseEnter(id, event);
    },
    [id, onMouseEnter]
  );

  return (
    <div
      onClick={onClick}
      role="link"
      tabIndex={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onEnterKeyDown}
      className={cx("layoutHeaderLink", {
        layoutHeaderLink__inactive: isActive === false,
      })}
    >
      {to ? (
        isExternal ? (
          <a
            href={to}
            rel="noopener noreferrer"
            target="_blank"
            className={cx("layoutHeaderLink_label")}
          >
            {label}
          </a>
        ) : (
          <a href={to} className={cx("layoutHeaderLink_label")}>
            {label}
          </a>
        )
      ) : (
        <span className={cx("layoutHeaderLink_label")}>{label}</span>
      )}

      {hasDropdown && (
        <>
          <div className={cx("layoutHeaderLink_icon")}>
            <Image src={"/icons/sort.svg"} alt="sort" width={10} height={8} />
          </div>
          <div
            ref={dropdownRef}
            className={cx("layoutHeaderLinkDropdown", {
              layoutHeaderLinkDropdown__hidden: !isDropdownOpen,
            })}
          >
            {dropdownLinks.map((dropdownLink) => {
              return dropdownLink.isExternal ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  key={dropdownLink.id}
                  href={dropdownLink.to}
                  className={cx("layoutHeaderLinkDropdown_link")}
                >
                  {dropdownLink.label}
                </a>
              ) : (
                <a
                  key={dropdownLink.id}
                  href={dropdownLink.to}
                  className={cx("layoutHeaderLinkDropdown_link")}
                >
                  {dropdownLink.label}
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

LayoutHeaderLink.defaultProps = {
  to: null,
  dropdown: [],
  headerPadding: 0,
};

export default LayoutHeaderLink;
