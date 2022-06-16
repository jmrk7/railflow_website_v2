/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import Button from "../../button";
import QuoteButton from "/components/button/QuoteButton.jsx";
import * as styles from "./pricing-plans.module.scss";
import PricingUserSelect from "../pricing-user-select";
import { basePricingPlans } from "../../quote-form/constants";
import { requestPricing } from "../../../api";
import { useEffect } from "react";

const cx = classnames.bind(styles);

const PricingPlans = () => {
  const [userIndex, setUserIndex] = useState(0);

  const [pricingPlans, setPricingPlans] = useState(basePricingPlans);

  const [userTiers, setUserTiers] = useState([]);
  useEffect(() => {
    const updatePricingSettings = async () => {
      const pricingResponse = await requestPricing();
      const newPricingPlans = pricingPlans.map((plan) => {
        return {
          ...plan,
          payment: {
            ...plan.payment,
            basePrice: pricingResponse.data?.pricing?.[plan.id]?.base,
          },
        };
      });
      setUserTiers(pricingResponse.data.users.tiers);
      setPricingPlans(newPricingPlans);
    };

    updatePricingSettings();
  }, []);

  return (
    <section id="pricing" className={cx("pricing")}>
      <LayoutSectionContainer>
        <div style={{position: "relative"}}>
          <h1 className={cx("pricing_title")}>Plans & Pricing</h1>
          <QuoteButton to={`/purchase?price-index=${userIndex}&type=quote`}>Get Quote</QuoteButton>
        </div>
        <p className={cx("pricing_subtitle")}>
          Simple, affordable and transparent pricing. Don&apos;t ever talk to a
          sales guy{" "}
          <span
            className={cx("pricing_emoji")}
            role="img"
            aria-label="party-emoji"
          >
            🥳
          </span>
        </p>

        <div className={cx("pricing_planSection")}>
          <div className={cx("pricing_userSelect")}>
            <PricingUserSelect
              userIndex={userIndex}
              userTiers={userTiers}
              setUserIndex={setUserIndex}
            />
          </div>
        </div>

        <div className={cx("pricing_planContainer")}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cx("pricingPlan", {
                pricingPlan__popular: !!plan.isPopular,
              })}
            >
              <h2 className={cx("pricingPlan_title")}>{plan.title}</h2>

              <div className={cx("pricingPlanPayment")}>
                {plan.isCustom ? (
                  <div className={cx("pricingPlanPayment_price")}>
                    Contact us for detailed discussion
                  </div>
                ) : (
                  <div>
                    <div className={cx("pricingPlanPayment_price")}>
                      <sup className={cx("pricingPlanPayment_currency")}></sup>
                      <span className={cx("pricingPlanPayment_amount")}>
                        {plan.payment.basePrice ? (
                          "$" +
                          (
                            plan.payment.basePrice +
                            plan.payment.per20Users * userIndex
                          ).toLocaleString() +
                          "/ Year"
                        ) : (
                          <div className={"spinner"}></div>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <ul className={cx("pricingPlan_featureContainer")}>
                {plan.features.map((planFeature, i) => (
                  <li
                    key={planFeature.id + i}
                    className={cx("pricingPlanFeature", {
                      pricingPlanFeature__unavailable: !planFeature.isAvailable,
                    })}
                  >
                    {planFeature.isAvailable ? (
                      <div className={cx("pricingPlanFeature_icon")}>
                        <Image
                          src={"/icons/check_blue.svg"}
                          alt="check icon"
                          width={16}
                          height={16}
                        />
                      </div>
                    ) : (
                      <div className={cx("pricingPlanFeature_icon")}>
                        <Image
                          src={"/icons/cross_grey.svg"}
                          alt="cross icon"
                          width={16}
                          height={16}
                        />
                      </div>
                    )}

                    {planFeature.label}
                  </li>
                ))}
              </ul>

              {plan.isCustom && (
                <div className={cx("pricingPlanQuoteButton")}>
                  <a href="/register">
                    <Button className={cx("pricingPlanButton")} inverse>
                      Register
                    </Button>
                  </a>
                </div>
              )}
              {!plan.isCustom && (
                <div className={cx("pricingPlanQuoteButton")}>
                  <Button
                    to={`/purchase?price-index=${userIndex}&license-type=${plan.id}&type=buy`}
                    className={cx("pricingPlanButton")}
                    inverse={!plan.isPopular}
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default PricingPlans;
