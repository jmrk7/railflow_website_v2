import React, { useCallback } from 'react';
import classnames from 'classnames/bind';

import * as styles from './checkbox-field.module.scss';

const cx = classnames.bind(styles);

const CheckboxField = (props) => {
  const { name, value, onChange, children } = props;

  const handleChange = useCallback(() => {
    onChange(name, !value);
  }, [onChange, name, value]);

  return (
    <label htmlFor="checkboxId" className={cx('checkboxField')}>
      <input
        name={name}
        checked={value}
        onChange={handleChange}
        id="checkboxId"
        type="checkbox"
        className={cx('checkboxField_input', {
          [`checkboxField_input${value ? '__checked' : ''}`]: true,
        })}
      />

      {children}
    </label>
  );
};

CheckboxField.defaultProps = {
  value: false,
};

export default CheckboxField;
