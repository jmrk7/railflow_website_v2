import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import * as styles from "./buy-now-hero.module.scss";

import CheckBlue from "../../public/icons/check_blue.svg";

const cx = classnames.bind(styles);

const buyNowHeroContent = {
  title: "Buy Railflow now",
  features: [
    "Dicta earum, ab autem, facere ipsam perferendis repellat numquam distinctio neque repellendus nemo soluta voluptas!",
    "Ab autem, facere ipsam perferendis repellat numquam distinctio neque repellendus nemo soluta voluptas!",
    "Facere ipsam perferendis repellat numquam distinctio neque repellendus nemo soluta voluptas!",
  ],
  desc: "Railflow supports REST, SOAP, GraphQL, IOT Technologies.",
};

const BuyNowHero = () => {
  return (
    <div className={cx("buyNowHero")}>
      <h2 className={cx("buyNowHero_title")}>{buyNowHeroContent.title}</h2>

      <ul className={cx("buyNowHero_featureContainer")}>
        {buyNowHeroContent.features.map((content, idx) => (
          <li key={idx} className={cx("buyNowHeroFeature")}>
            <div className={cx("buyNowHeroFeature_icon")}>
              <Image src={CheckBlue} alt="check icon" />
            </div>
            {content}
          </li>
        ))}
      </ul>
      <p className={cx("buyNowHero_desc")}>{buyNowHeroContent.desc}</p>
    </div>
  );
};

export default BuyNowHero;
