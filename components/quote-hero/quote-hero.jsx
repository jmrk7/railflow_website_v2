import React from "react";
import classnames from "classnames/bind";

import * as styles from "./quote-hero.module.scss";
import Link from "next/link";

const cx = classnames.bind(styles);

const quoteHeroContent = {
  title:
    "Railflow in the only solution in the market that offers out of the box solutions for all your integration needs. Integrate CICD workflows, test frameworks, open source and commerical tools without wasting your precious engineering resources.",
  features: [
    "14 day free trial. No credit card required",
    "Access to free enterprise support (real humans)",
    "Happier and more relaxed QA teams and management",
    "Prepare to super charge your engineering productivity",
  ],
};

const QuoteHero = () => {
  return (
    <div className={cx("quoteHero")}>
      <Link href="/">
        <div className={cx("quoteHeroLogo")}>
          <img
            src={"/images/logo.png"}
            alt="logo"
            className={cx("quoteHeroLogo_image")}
          />
        </div>
      </Link>
      <h2 className={cx("quoteHero_title")}>{quoteHeroContent.title}</h2>

      <ul className={cx("quoteHero_featureContainer")}>
        {quoteHeroContent.features.map((content, idx) => (
          <li key={idx} className={cx("quoteHeroFeature")}>
            <img
              src={"/icons/check_blue.svg"}
              alt="check icon"
              className={cx("quoteHeroFeature_icon")}
            />
            {content}
          </li>
        ))}
      </ul>
      <p className={cx("quoteHero_desc")}>{quoteHeroContent.desc}</p>
    </div>
  );
};

export default QuoteHero;
