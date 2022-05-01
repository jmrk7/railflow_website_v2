import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import LayoutSidebarLink from "./layout-sidebar-link";
import CalendlyButton from "../calendly-button";
import Button from "../button";
import navigationLinks from "../../src/constants/navigation-links";
import scrollToSection from "../../utils/scroll-to-section";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutSidebar = (props) => {
  const { isOpen, closeSidebar } = props;

  return (
    <aside
      className={cx("layoutSidebar", {
        layoutSidebar__close: !isOpen,
      })}
    >
      <section className={cx("layoutSidebar_section")}>
        {/* INFO: close sidebar button */}
        <button
          onClick={closeSidebar}
          type="button"
          className={cx("layoutSidebarClose")}
        >
          <Image
            src={"/icons/arrow_right.svg"}
            alt="Arrow Right Image"
            width={20}
            height={15}
          />
        </button>
      </section>

      <section className={cx("layoutSidebar_section")}>
        {navigationLinks.map((navigationLink) => {
          const onClick = () =>
            scrollToSection(navigationLink.sectionElementId);

          return (
            <LayoutSidebarLink
              key={navigationLink.id}
              {...navigationLink}
              onClick={onClick}
              closeSidebar={closeSidebar}
            />
          );
        })}
      </section>

      <section className={cx("layoutSidebar_section")}>
        <Button to="/register" className={cx("layoutSidebarButton")}>
          sign up
        </Button>
      </section>
      <section className={cx("layoutSidebar_section")}>
        <CalendlyButton />
      </section>
    </aside>
  );
};

export default LayoutSidebar;
