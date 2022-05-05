import React from "react";
import { useRouter } from "next/router";

const Index = (props) => {
  
  React.useEffect(() => {
    const router = useRouter();
    if (router.pathname === "/about") {
      // INFO: redirect to sign up page
      router.push("/about/company");
    }
  }, []);

  return null;
};

export default Index;
