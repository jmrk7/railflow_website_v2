import React, { useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import classnames from 'classnames/bind';

import 'react-phone-input-2/lib/style.css';
import * as styles from './phone-field.module.scss';

const cx = classnames.bind(styles);

const PhoneField = (props) => {
  const {
    name,
    value,
    onChange,
    lookType,
    message,
    label,
    placeholder,
    className,
  } = props;

  // INFO: for passing to label element's 'htmlFor' attribut

  const handleChange = useCallback(
    (inputValue) => {
      onChange(name, inputValue);
      // onChange(name, event.target.value);
    },
    [name, onChange],
  );

  return (
    <div
      className={cx('phoneField', {
        [`phoneField__${lookType}`]: true,
        [className]: true,
      })}
    >
      <label
        htmlFor="phoneFieldId"
        className={cx('phoneField_label')}
      >
        {label}
      </label>

      <PhoneInput
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        country="us"
        containerClass={cx('phoneField_container', {
          [`phoneField__${lookType}_container`]: true,
        })}
        buttonClass={cx('phoneField_button', {
          [`phoneField__${lookType}_button`]: true,
        })}
        dropdownClass={cx('phoneField_dropdown', {
          [`phoneField__${lookType}_dropdown`]: true,
        })}
        inputClass={cx('phoneField_input', {
          [`phoneField__${lookType}_input`]: true,
        })}
      />

      <div
        className={cx('phoneFieldMessage', {
          [`phoneField__${lookType}Message`]: true,
        })}
      >
        <div
          className={cx('phoneFieldMessage_text', {
            [`phoneField__${lookType}Message_text`]: true,
          })}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

PhoneField.defaultProps = {
  label: '',
  placeholder: '',
  inputProps: {},
};

export default PhoneField;
