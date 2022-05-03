import React from "react";
import Link from "next/link";
import classnames from "classnames/bind";
import Image from "next/image";

import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const LayoutFooter = () => {
  return (
    <footer className={cx("layoutFooter")}>
      <div className={cx("layoutFooterBody")}>
        <section className={cx("layoutFooterBody_section")}>
          <div className={cx("layoutFooterBodyBrand")}>
            <Link href="/" passHref>
              <div className={cx("layoutFooterBodyBrandLogo_image")}>
                <Image
                  src={"/images/logo.png"}
                  alt="logo"
                  width={132}
                  height={32}
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
