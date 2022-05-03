import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../Layout';
import Button from '../../button';
import CheckIcon from '../../../assets/icons/check_blue.svg';
import CrossIcon from '../../../assets/icons/cross_grey.svg';
import * as styles from './pricing.module.scss';

const cx = classnames.bind(styles);

// TODO: move to constant
const plans = [
  {
    id: 'starter',
    title: 'Starter',
    payment: {
      price: { amount: 0, currency: '$' },
      frequency: 'Per Month, Billed Annually',
    },
    features: [
      { id: 'starter_1', label: '1 Team Member', isAvailable: true },
      {
        id: 'starter_2',
        label: '10 MB Upload Size',
        isAvailable: true,
      },
      {
        id: 'starter_3',
        label: 'Military grade server protection',
        isAvailable: true,
      },
      {
        id: 'starter_4',
        label: 'Limited XXX features',
        isAvailable: true,
      },
      {
        id: 'starter_5',
        label: 'Priority support',
        isAvailable: false,
      },
      {
        id: 'starter_6',
        label: 'Custom analytics filters',
        isAvailable: false,
      },
      {
        id: 'starter_7',
        label: 'API and webhook access',
        isAvailable: false,
      },
    ],
  },
  {
    id: 'team',
    title: 'Team',
    payment: {
      price: { amount: 24, currency: '$' },
      frequency: 'Per Month, Billed Annually',
    },
    frequency: 'Per Month, Billed Annually',
    features: [
      { id: 'team_1', label: '8 Team Members', isAvailable: true },
      { id: 'team_2', label: '48 MB Upload Size', isAvailable: true },
      {
        id: 'team_3',
        label: 'Military grade server protection',
        isAvailable: true,
      },
      {
        id: 'team_4',
        label: 'Limited XXX features',
        isAvailable: true,
      },
      { id: 'team_5', label: 'Priority support', isAvailable: true },
      {
        id: 'team_6',
        label: 'Custom analytics filters',
        isAvailable: false,
      },
      {
        id: 'team_7',
        label: 'API and webhook access',
        isAvailable: false,
      },
    ],
    isPopular: true,
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    payment: {
      price: { amount: 48, currency: '$' },
      frequency: 'Per Month, Billed Annually',
    },
    features: [
      {
        id: 'enterprise_1',
        label: '1 Team Member',
        isAvailable: true,
      },
      {
        id: 'enterprise_2',
        label: '10 MB Upload Size',
        isAvailable: true,
      },
      {
        id: 'enterprise_3',
        label: 'Military grade server protection',
        isAvailable: true,
      },
      {
        id: 'enterprise_4',
        label: 'Limited XXX features',
        isAvailable: true,
      },
      {
        id: 'enterprise_5',
        label: 'Priority support',
        isAvailable: true,
      },
      {
        id: 'enterprise_6',
        label: 'Custom analytics filters',
        isAvailable: true,
      },
      {
        id: 'enterprise_7',
        label: 'API and webhook access',
        isAvailable: true,
      },
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className={cx('pricing')}>
      {/* <h1 className={cx('pricing_title')}>
        Choose your plan
      </h1> */}

      <LayoutSectionContainer>
        <div className={cx('pricing_planContainer')}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cx('pricingPlan', {
                pricingPlan__popular: !!plan.isPopular,
              })}
            >
              <h2 className={cx('pricingPlan_title')}>
                {plan.title}
              </h2>

              <div className={cx('pricingPlanPayment')}>
                <div className={cx('pricingPlanPayment_price')}>
                  <sup className={cx('pricingPlanPayment_currency')}>
                    {plan.payment.price.currency}
                  </sup>
                  <span className={cx('pricingPlanPayment_amount')}>
                    {plan.payment.price.amount}
                  </span>
                </div>
                <div className={cx('pricingPlanPayment_frequency')}>
                  {plan.payment.frequency}
                </div>
              </div>

              <ul className={cx('pricingPlan_featureContainer')}>
                {plan.features.map((planFeature) => (
                  <li
                    key={planFeature.id}
                    className={cx('pricingPlanFeature', {
                      pricingPlanFeature__unavailable: !planFeature.isAvailable,
                    })}
                  >
                    {planFeature.isAvailable ? (
                      <CheckIcon
                        className={cx('pricingPlanFeature_icon')}
                      />
                    ) : (
                      <CrossIcon
                        className={cx('pricingPlanFeature_icon')}
                      />
                    )}

                    {planFeature.label}
                  </li>
                ))}
              </ul>

              <Button to="/register" inverse={!plan.isPopular}>
                Start For Free
              </Button>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default Pricing;
