import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../Layout';
import * as styles from './steps.module.scss';

const cx = classnames.bind(styles);

const ThankYou = () => {
  return (
    <section id="steps" className={cx('steps')}>
      <LayoutSectionContainer>
        <div className={cx('steps_sectionContainer')}>
          <h2 className={cx('steps_title')}>
            Follow these three quick steps to get your Railflow trial
            activated
          </h2>
          <ol className={cx('steps_list')}>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique numquam porro deleniti doloribus delectus
              explicabo obcaecati accusamus dolorem sequi cumque saepe
              sapiente iusto odio molestias, est totam? Deleniti,
              expedita sed?
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Ex deleniti possimus aut ut porro dolorum,
              provident fugiat necessitatibus nulla vel id esse unde,
              labore quos rerum blanditiis consequuntur vero saepe!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Vel quidem amet quos explicabo porro eos. Illum cum quo,
              tempore qui esse animi consectetur assumenda. Vel id
              repudiandae sunt quia accusamus.
            </li>
          </ol>
          <p className={cx('steps_text')}>
            Looking for another version? Please click here to access
            alternate downloads. If you have any further questions on
            how to activate your license, please follow our
            installation instructions or contact a sales
            representative at sales@railflow.com.
          </p>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default ThankYou;
