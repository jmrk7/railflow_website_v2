import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();
  console.log(router);
  if (router.pathname === "/about") {
    // INFO: redirect to sign up page
    router.push("/about/company");
  }

  return null;
};

export default Index;
