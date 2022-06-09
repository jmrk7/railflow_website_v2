import React, { useCallback, useMemo, useRef } from "react";
import classnames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

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
          <Link href={to} passHref>
            <div className={cx("layoutHeaderLink_label")}>{label}</div>
          </Link>
        )
      ) : (
        <span className={cx("layoutHeaderLink_label")}>{label}</span>
      )}

      {hasDropdown && (
        <>
          <img src={"/icons/sort.svg"} alt="sort" width={10} height={8} className={cx("layoutHeaderLink_icon")}/>

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
                <Link href={dropdownLink.to} key={dropdownLink.id} passHref>
                  <div
                    className={cx("layoutHeaderLinkDropdown_link")}
                  >
                    {dropdownLink.label}
                  </div>
                </Link>
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
