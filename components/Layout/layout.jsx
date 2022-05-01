import React, { useState, useCallback } from "react";
import classnames from "classnames/bind";

import Header from "./layout-header";
import Sidebar from "./layout-sidebar";
import Footer from "./layout-footer";
import * as styles from "./layout.module.scss";

const cx = classnames.bind(styles);

const Layout = (props) => {
  const { isHeaderPresent, isFooterPresent, children } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <main className={cx("layout")}>
      {isHeaderPresent && <Header openSidebar={openSidebar} />}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* INFO: link to index page in case of the  */}

      <div className={cx("layoutBody")}>{children}</div>

      {isFooterPresent && <Footer />}
    </main>
  );
};

Layout.defaultProps = {
  isHeaderPresent: true,
  isFooterPresent: true,
};

export default Layout;
