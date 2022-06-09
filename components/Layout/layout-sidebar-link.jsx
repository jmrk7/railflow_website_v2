import React, { useState, useCallback, useMemo } from "react";
import classnames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";

import onEnterKeyDown from "../../utils/on-enter-key-down";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutSidebarLink = (props) => {
  const { label, to, isExternal, dropdownLinks, closeSidebar, onClick } = props;

  const hasDropdown = useMemo(
    () => !!(dropdownLinks && dropdownLinks.length),
    [dropdownLinks]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = useCallback(() => {
    // INFO: invoke `onClick` funciton received from props.
    if (typeof onClick === "function") {
      onClick();
    }

    // INFO: if has dropdown, then toggle dropdown.
    if (hasDropdown) {
      setIsDropdownOpen((currentIsDropdownOpen) => !currentIsDropdownOpen);

      return;
    }

    if (typeof closeSidebar === "function") {
      closeSidebar();
    }
  }, [onClick, hasDropdown, closeSidebar]);

  return (
    <div
      onClick={handleClick}
      onKeyDown={onEnterKeyDown(handleClick)}
      role="button"
      tabIndex="-1"
      className={cx("layoutSidebarLink")}
    >
      {to ? (
        isExternal ? (
          <a
            href={to}
            rel="noopener noreferrer"
            target="_blank"
            className={cx("layoutSidebarLink_label")}
          >
            {label}
          </a>
        ) : (
          <Link href={to} passHref>
            <div className={cx("layoutSidebarLink_label")}>{label}</div>
          </Link>
        )
      ) : (
        <span className={cx("layoutSidebarLink_label")}>
          {label}
          {hasDropdown && (
            <img src={"/icons/sort.svg"} alt="sort" className={cx("layoutHeaderLink_icon")} height={8.414} />
          )}
        </span>
      )}

      {hasDropdown && (
        <div
          className={cx("layoutSidebarLinkDropdown", {
            layoutSidebarLinkDropdown__close: !isDropdownOpen,
          })}
        >
          {dropdownLinks.map((dropdownLink) => (
            <Link key={dropdownLink.id} href={dropdownLink.to} passHref>
              <div className={cx("layoutSidebarLinkDropdown_link")}>
                {dropdownLink.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

LayoutSidebarLink.defaultProps = {
  to: null,
  dropdown: [],
};

export default LayoutSidebarLink;
