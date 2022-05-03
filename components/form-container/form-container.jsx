import React from 'react';
import classnames from 'classnames/bind';

import * as styles from './form-container.module.scss';

const cx = classnames.bind(styles);

const FormContainer = (props) => {
  const { children } = props;

  return <div className={cx('formContainer')}>{children}</div>;
};

export default FormContainer;
