import React from 'react';
import classnames from 'classnames/bind';

import * as styles from './coming-soon.module.scss';

const cx = classnames.bind(styles);

const ComingSoon = () => {
  return (
    <div className={cx('comingSoon')}>
      <h1 className={cx('comingSoon_title')}>Coming Soon!</h1>
    </div>
  );
};

export default ComingSoon;
