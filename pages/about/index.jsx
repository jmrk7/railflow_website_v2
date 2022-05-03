import React from "react";
import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();
  React.useEffect(() => {
    if (router.pathname === "/about") {
      // INFO: redirect to sign up page
      router.push("/about/company");
    }
  }, []);

  return null;
};

export default Index;
