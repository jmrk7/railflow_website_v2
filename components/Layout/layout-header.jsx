import React, { useState, useCallback, useRef } from "react";
import classnames from "classnames/bind";
import Router from "next/router";

import LayoutSectionContainer from "./layout-section-container";
import LayoutHeaderLink from "./layout-header-link";
import navigationLinks from "../../src/constants/navigation-links";
import scrollToSection from "../../utils/scroll-to-section";
import Button from "../button";
import CalendlyButton from "../calendly-button";

import Image from "next/image";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutHeader = (props) => {
  const { openSidebar } = props;

  const headerRef = useRef();

  const [activeHeaderLinkId, setActiveHeaderLinkId] = useState(null);

  // TODO: handle via pure css
  const handleMouseEnterHeaderLink = useCallback((id, event) => {
    setActiveHeaderLinkId(id);
  }, []);

  const handleMouseLeaveHeaderLink = useCallback(() => {
    setActiveHeaderLinkId(null);
  }, []);

  const joinSlack = () => {
    Router.push('https://join.slack.com/t/railflow/shared_invite/zt-1ahbv867n-nS0_ULIOATOvkSGuC33ZNQ');
  }

  const goHome = () => {
    Router.push("/")
  }

  return (
    <header ref={headerRef} className={cx("layoutHeader")}>
      <LayoutSectionContainer>
        <div className={cx("layoutHeader_sectionContainer")}>
          <section className={cx("layoutHeader_section")}>
            <a onClick={goHome} className={cx("layoutHeaderLogo")} style={{cursor: "pointer"}}>
              <img
                src={"/images/logo.png"}
                alt="logo"
                className={cx('layoutHeaderLogo_image')}
              />
            </a>
          </section>

          <section className={cx("layoutHeader_section", "layoutHeader_left")}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center" ,marginRight:"16px"}}>
              <p style={{marginRight: "8px", fontSize: "1.1rem"}}>Join us on</p>
              <div style={{cursor: "pointer"}} onClick={joinSlack}>
                <Image
                  src={"/icons/slack-logo.svg"}
                  alt="Slack"
                  height={30}
                  width={30}
                />
              </div>              
              <div style={{marginLeft: "8px", color: "white"}} >
                <p onClick={joinSlack} style={{textDecoration: "underline", cursor: "pointer", fontSize: "1.1rem"}}>Slack</p>
              </div>
            </div>
            {navigationLinks.map((navigationLink) => {
              const onClick = () => {
                if (
                  navigationLink.mainRoute &&
                  navigationLink.mainRoute !== location.pathname
                )
                  Router.push(navigationLink.mainRoute);
                else scrollToSection(navigationLink.sectionElementId);
              };
              const isActive =
                activeHeaderLinkId === null ||
                activeHeaderLinkId === navigationLink.id;
              const isDropdownOpen = activeHeaderLinkId === navigationLink.id;

              return (
                <LayoutHeaderLink
                  key={navigationLink.id}
                  {...navigationLink}
                  onClick={onClick}
                  onMouseEnter={handleMouseEnterHeaderLink}
                  onMouseLeave={handleMouseLeaveHeaderLink}
                  isActive={isActive}
                  isDropdownOpen={isDropdownOpen}
                />
              );
            })}

            <Button to="/register" className={cx("layoutHeaderButton")}>
              sign up
            </Button>
            <div className={cx("layoutHeaderButton")}>
              <CalendlyButton />
            </div>
            {/* INFO: open sidebar button */}
            <button
              onClick={openSidebar}
              type="button"
              className={cx("layoutHeaderOpenSidebar")}
            >
              <div className={cx("layoutHeaderOpenSidebar_icon")}>
                <Image
                  src={"/icons/bars.svg"}
                  alt="bar Icon"
                  height={40}
                  width={34}
                />
              </div>
            </button>
          </section>
        </div>
      </LayoutSectionContainer>
    </header>
  );
};

export default LayoutHeader;
