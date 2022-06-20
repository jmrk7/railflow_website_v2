import React from "react";
import Link from "next/link";
import Image from "next/image";

import classnames from "classnames/bind";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "../../public/images/logo.png";

import * as styles from "./sign-up-hero.module.scss";

const cx = classnames.bind(styles);

const signUpHeroContent = {
  title:
    "Railflow in the only solution in the market that offers out of the box solutions for all your integration needs. Integrate CICD workflows, test frameworks, open source and commerical tools without wasting your precious engineering resources.",
  features: [
    "14 day free trial. No credit card required",
    "Access to free enterprise support (real humans)",
    "Happier and more relaxed QA teams and management",
    "Prepare to super charge your engineering productivity",
  ],
};
const SignUpHero = () => {
  return (
    <div className={cx("signUpHero")}>
      <Link href={"/"}>
        <img src={"/images/home_features/cli.png"} alt="cli" style={{cursor: "pointer"}} />
      </Link>
      {/* <h3 className={cx("signUpHero_title")}>{signUpHeroContent.title}</h3> */}

      <ul
        className={cx("signUpHero_featureContainer")}
        style={{ marginLeft: "50px" }}
      >
        {signUpHeroContent.features.map((content, idx) => (
          <li key={idx} className={cx("signUpHeroFeature")}>
            <div
              className={cx("signUpHeroFeature_icon")}
              style={{ height: "auto" }}
            >
              <CheckCircleIcon />
            </div>
            {content}
          </li>
        ))}
      </ul>
      <p className={cx("signUpHero_desc")}>{signUpHeroContent.desc}</p>
    </div>
  );
};

export default SignUpHero;
