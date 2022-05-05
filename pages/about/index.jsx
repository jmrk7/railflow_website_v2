import React from "react";
import Router from "next/router";

const Index = (props) => {
  React.useEffect(() => {
    if (Router.pathname === "/about") {
      // INFO: redirect to sign up page
      Router.push("/about/company");
    }
  }, []);

  return null;
};

export default Index;
