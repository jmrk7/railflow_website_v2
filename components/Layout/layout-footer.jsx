import React from "react";
import Link from "next/link";
import classnames from "classnames/bind";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutFooter = () => {
  return (
    <footer className={cx("layoutFooter")}>
      <div className={cx("layoutFooterBody")}>
        <section className={cx("layoutFooterBody_section")}>
          <div className={cx("layoutFooterBodyBrand")}>
            <Link href="/" passHref>
              <div className={cx("layoutFooterBodyBrandLogo")}>
                <img
                  src={"/images/logo.png"}
                  alt="logo"
                  className={cx('layoutFooterBodyBrandLogo_image')}
                />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default LayoutFooter;
