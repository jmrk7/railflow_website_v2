/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import classnames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { LayoutSectionContainer } from "../../Layout";
import Button from "../../button";
import QuoteButton from "../../../components/button/quotebutton.jsx";
import * as styles from "./pricing-plans.module.scss";
import PricingUserSelect from "../pricing-user-select/default.jsx";
import { basePricingPlans } from "../../quote-form/constants";
import { requestPricing } from "../../../api";
import { useEffect } from "react";

const cx = classnames.bind(styles);

const PricingPlans = () => {
  const [userIndex, setUserIndex] = useState(1);

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
        <div style={{ position: "relative" }}>
          <h1 className={cx("pricing_title")}>Plans & Pricing</h1>
          <QuoteButton to={`/purchase?price-index=${userIndex}&type=quote`}>
            Get Quote
          </QuoteButton>
        </div>
        <p className={cx("pricing_subtitle")}>
          Simple, affordable and transparent pricing.
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
              <div>
                <h2 className={cx("pricingPlan_title")}>{plan.title}</h2>

                <div className={cx("pricingPlanPayment")}>
                  {plan.isCustom ? (
                    <div className={cx("pricingPlanPayment_price")}>
                      $ 0.00 / YEAR
                    </div>
                  ) : (
                    <div>
                      <div className={cx("pricingPlanPayment_price")}>
                        <sup
                          className={cx("pricingPlanPayment_currency")}
                        ></sup>
                        <span className={cx("pricingPlanPayment_amount")}>
                          {plan.payment.basePrice ? (
                            "$" +
                            (
                              plan.payment.basePrice - plan.payment.per20Users/2 +
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
                        pricingPlanFeature__unavailable:
                          !planFeature.isAvailable,
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
              </div>
              <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                {plan.isCustom && (
                  <div className={cx("pricingPlanQuoteButton")}>
                    <Link href={`/purchase?license-type=enterprise&type=buy&support=true`}>
                      <Button className={cx("pricingPlanButton")} inverse>
                        Enterprise Support
                      </Button>
                    </Link>
                    <Link href="/free-cli">
                      <Button className={cx("pricingPlanButton")}>
                        CLI - Free
                      </Button>
                    </Link>
                  </div>
                )}
                {!plan.isCustom && (
                  <div className={cx("pricingPlanQuoteButton")}>
                    <Link href="/register">
                      <Button className={cx("pricingPlanButton")} inverse>
                      Enterprise Trial
                      </Button>
                    </Link>
                    <Link href={`/purchase?price-index=${userIndex}&license-type=${plan.id}&type=buy`}>
                      <Button className={cx("pricingPlanButton")}>
                        Instant Purchase
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default PricingPlans;
