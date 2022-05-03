import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames/bind';

import generateUniqueIdentifier from '../../../utils/generate-unique-identifer';
import * as styles from './text-field.module.scss';

const cx = classnames.bind(styles);

const TextField = (props) => {
  const {
    type,
    name,
    value,
    onChange,
    lookType,
    message,
    label,
    placeholder,
    inputProps,
    className,
  } = props;

  // INFO: for passing to label element's 'htmlFor' attribute

  const handleChange = useCallback(
    (event) => {
      event.persist();

      onChange(name, event.target.value);
    },
    [name, onChange],
  );

  return (
    <div
      className={cx('textField', {
        [`textField__${lookType}`]: true,
        [className]: true,
      })}
    >
      <label
        htmlFor="textField_Id"
        className={cx('textField_label')}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        id="textField_Id"
        {...inputProps}
        className={cx('textField_input', {
          [`textField__${lookType}_input`]: true,
        })}
      />

      {message && (
        <div
          className={cx('textFieldMessage', {
            [`textField__${lookType}Message`]: true,
          })}
        >
          <div
            className={cx('textFieldMessage_text', {
              [`textField__${lookType}Message_text`]: true,
            })}
          >
            {message.text}
          </div>
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  inputProps: {},
};

export default TextField;
