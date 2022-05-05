import React, { useState, useCallback, useMemo } from "react";
import Router from "next/router";

import ReCAPTCHA from "react-google-recaptcha";
import classnames from "classnames/bind";

import { TextField, PhoneField, CheckboxField } from "../form";
import Button from "../button";

import { requestSignUp } from "../../api";
import { initialFieldData } from "./constants";
import { validateField, formatFieldValue, getRequestData } from "./utils";
import * as styles from "./sign-up-form.module.scss";

const cx = classnames.bind(styles);

const SignUpForm = () => {
  const [fieldData, setFieldData] = useState(initialFieldData);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChangeField = useCallback((name, value) => {
    setFieldData((currentFieldData) => ({
      ...currentFieldData,
      [name]: {
        ...currentFieldData[name],
        value: formatFieldValue(name, value, currentFieldData[name].value),
        ...validateField(name, value),
      },
    }));
  }, []);

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(true);

  const handleVerifyRecaptcha = useCallback((value) => {
    setIsRecaptchaVerified(value);
  }, []);

  const isFieldDataValid = useMemo(() => {
    return Object.values(fieldData).every((fieldDatum) => !!fieldDatum.isValid);
  }, [fieldData]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isFieldDataValid || !isRecaptchaVerified) {
        return;
      }

      if (!fieldData.termsAgreement.value) {
        // TODO: validate form
        alert(
          "You should agree to our terms and conditions in order to able to submit the form."
        );
        return;
      }

      const requestData = {
        ...getRequestData(fieldData),
        phone: `+${fieldData.phone.value}`,
      };

      try {
        setIsRequestPending(true);
        const signUpResponse = await requestSignUp(requestData);
        setIsResponseSuccessful(true);
        localStorage.setItem(
          "license_link",
          signUpResponse?.data?.data?.license_link
        );
        localStorage.setItem(
          "license_key",
          signUpResponse?.data?.data?.license_key
        );
        if (
          signUpResponse.data.status === 201 ||
          signUpResponse.data.status === 200
        ) {
          Router.push(`/thank-you`);
        } else if (signUpResponse.data.status === 403) {
          Router.push(`/duplicate-evaluation`);
        } else {
          setResponseMessage(signUpResponse.data.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          Router.push(`/duplicate-evaluation`);
        }
        setIsResponseSuccessful(false);
        error.response && setResponseMessage(error.response.data.message);
      } finally {
        setIsRequestPending(false);
      }
    },
    [fieldData, isFieldDataValid, isRecaptchaVerified]
  );

  return (
    // TODO: replace with common form component
    <form onSubmit={handleSubmit} className={cx("signUpForm")}>
      <h2 className={cx("signUpForm_title")}>
        Risk Free 14 Day Railflow Trial
      </h2>

      {!isRequestPending && isResponseSuccessful !== null && (
        <div
          className={cx("signUpForm_messageContainer", {
            [`signUpForm_messageContainer__${
              isResponseSuccessful ? "success" : "failure"
            }`]: true,
          })}
        >
          {responseMessage}
        </div>
      )}
      {isRequestPending && (
        <div className={cx("signUpForm_loadingContainer")}>
          <div className={cx("signUpForm_spinner")} />
          <div>Processing, please wait...</div>
        </div>
      )}

      {!isRequestPending && isResponseSuccessful === null && (
        <>
          <section className={cx("signUpForm_fieldContainer")}>
            {/* TODO: place form fields by mapping through array */}
            <div className={cx("signUpFormFieldGroup")}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                {...fieldData.firstName}
                onChange={handleChangeField}
                className={cx("signUpFormFieldGroup_item")}
              />
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                {...fieldData.lastName}
                onChange={handleChangeField}
                className={cx("signUpFormFieldGroup_item")}
              />
            </div>

            <div className={cx("signUpFormFieldGroup")}>
              <TextField
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                {...fieldData.email}
                onChange={handleChangeField}
              />
            </div>
            <PhoneField
              name="phone"
              label="Phone"
              placeholder="Phone"
              {...fieldData.phone}
              onChange={handleChangeField}
            />
            <TextField
              type="text"
              name="jobTitle"
              label="Job Title"
              placeholder="Job Title"
              {...fieldData.jobTitle}
              onChange={handleChangeField}
            />
            <TextField
              type="text"
              name="company"
              label="Company Name"
              placeholder="Company Name"
              {...fieldData.company}
              onChange={handleChangeField}
            />
            <CheckboxField
              name="termsAgreement"
              {...fieldData.termsAgreement}
              onChange={handleChangeField}
            >
              I agree to the{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://railflow.io/terms"
                className={cx("signUpForm_termsLink")}
              >
                Terms &amp; Conditions
              </a>{" "}
              and the{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://railflow.io/privacy"
                className={cx("signUpForm_termsLink")}
              >
                Privacy Policy
              </a>
            </CheckboxField>
          </section>

          <section className={cx("signUpForm_recaptchaContainer")}>
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={handleVerifyRecaptcha}
              theme="dark"
            />
          </section>

          <section className={cx("signUpForm_buttonContainer")}>
            <Button
              type="submit"
              className={cx("signUpForm_submit")}
              isDisabled={!isFieldDataValid || !isRecaptchaVerified}
            >
              Sign Up
            </Button>
          </section>
        </>
      )}

      {/* <section className={cx('signUpForm_footer')}>
        Already have an account? Sign in here
      </section> */}
    </form>
  );
};

export default SignUpForm;
