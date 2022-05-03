import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames/bind';

import generateUniqueIdentifier from '../../../utils/generate-unique-identifer';
import * as styles from './checkbox-field.module.scss';

const cx = classnames.bind(styles);

const CheckboxField = (props) => {
  const { name, value, onChange, children } = props;

  // INFO: unique id for label's 'htmlFor' attribute
  const inputElementId = useMemo(
    () => generateUniqueIdentifier(),
    [],
  );

  const handleChange = useCallback(() => {
    onChange(name, !value);
  }, [onChange, name, value]);

  return (
    <label htmlFor={inputElementId} className={cx('checkboxField')}>
      <input
        name={name}
        checked={value}
        onChange={handleChange}
        id={inputElementId}
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
