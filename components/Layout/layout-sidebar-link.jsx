import React, { useState, useCallback, useMemo } from "react";
import classnames from "classnames/bind";
import Link from "next/link";

import onEnterKeyDown from "../../utils/on-enter-key-down";
import SideBarSubLink from "./layout-sidebar-sublink";
import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutSidebarLink = (props) => {
  const { label, to, isExternal, dropdownLinks, closeSidebar, onClick, items } =
    props;

  const hasDropdown = useMemo(
    () => !!(dropdownLinks && dropdownLinks.length),
    [dropdownLinks]
  );
  
  const [dropDownShow, setDropDownShow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropDown = (e) => {
    e.preventDefault()
    setDropDownShow(!dropDownShow)
  }
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
        <span className={cx("layoutSidebarLink_label")} onClick={handleClick}>
          {label}
          {hasDropdown && (
            <img
              src={"/icons/sort.svg"}
              alt="sort"
              className={cx("layoutHeaderLink_icon")}
              height={8.414}
            />
          )}
        </span>
      )}

      {hasDropdown && (
        <div
          className={cx("layoutSidebarLinkDropdown", {
            layoutSidebarLinkDropdown__close: !isDropdownOpen,
          })}
        >
          {dropdownLinks.map((dropdownLink) =>
            dropdownLink.items ? (
            <div key={dropdownLink.id}>
              <div style={{display: "flex", alignItems: "center"}} onClick={handleDropDown}>
                <div className={cx("layoutSidebarLinkDropdown_link")} style={{paddingRight: "0px",}}>
                  {dropdownLink.label}
                </div>
                <img
                  src={"/icons/sort.svg"}
                  alt="sort"
                  className={cx("layoutHeaderLink_icon")}
                  height={8.414}
                />
              </div>
              <div className={cx("layoutSidebarLink")} style={{margin: "0px", padding: "4px 0px 4px 24px", marginLeft: "24px", display: dropDownShow?"block":"none"}}>
                {dropdownLink.items.map((item) => {
                  return item.isExternal 
                  ? (<a key={item.id} href={item.to} rel="noopener noreferrer" target="_blank" className={cx("layoutSidebarLink_label")}>
                      {item.label}
                    </a>)
                  : (<Link key={item.id} href={item.to} passHref>
                      <div className={cx("layoutSidebarLink_label")} style={{paddingBottom:"12px"}}>{item.label}</div>
                    </Link>)
                })}
              </div>
            </div>
            ) : (
              <Link key={dropdownLink.id} href={dropdownLink.to} passHref>
                <div className={cx("layoutSidebarLinkDropdown_link")}>
                  {dropdownLink.label}
                </div>
              </Link>
            )
          )}
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
