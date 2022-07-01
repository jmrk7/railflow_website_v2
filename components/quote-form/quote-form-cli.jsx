/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import classnames from "classnames/bind";
import { useRouter } from "next/router";

import {
  requestSignUp,
  requestAccount,
  requestStripe,
} from "../../api";

import { TextField, PhoneField, SelectField } from "../form";
import Button from "../button";
import SecureButton from "../button/securebutton";
import { initialFieldData } from "./constants";
import { validateField, formatFieldValue, getRequestData } from "./utils";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  Step,
  StepLabel,
  Stepper,
  Select,
  MenuItem,
} from "@mui/material";
import * as styles from "./quote-form.module.scss";

const cx = classnames.bind(styles);

const MuiStepLabel = styled(StepLabel)(({ theme }) => ({
  ".MuiStepLabel-label": {
    color: "#758491",
    "&.Mui-active": {
      color: "white",
    },
    "&.Mui-completed": {
      color: "white",
    },
  },
  ".MuiStepIcon-root": {
    width: 31,
    height: 31,
    color: "#758491",
    "&.Mui-active": {
      color: "#3f51b5",
    },
  },
}));

const MuiStepper = styled(Stepper)(({ theme }) => ({
  width: 542,
  height: 67,
  padding: 24,
  marginBottom: 48,
}));

const MuiStep = styled(Step)(({ theme }) => ({
  ".MuiStepConnector-root": {
    top: "16px !important",
  },
}));

const QuoteFrom = () => {
  const [fieldData, setFieldData] = useState(initialFieldData);
  const [contactResponse, setContactResponse] = useState({});
  const [_accountResponse, setAccountResponse] = useState({});
  const [hiveageResponse, setHiveageResponse] = useState({});

  const [selectedPlan, setSelectedPlan] = useState(0);
  const plans = [
    {
      id: 1, text: "1 Year"
    },
    {
      id: 2, text: "2 Years"
    },
    {
      id: 3, text: "3 Years"
    },
    {
      id: 4, text: "4 Years"
    },
    {
      id: 5, text: "5 Years"
    },
  ]

  const [activeStep, setActiveStep] = React.useState(0);
  const stepLabels = ["About You", "Company Info", "Summary"];

  const buytype = "buy";
  const router = useRouter();

  const basePrice = 500;

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(process.env.RECAPTCHA_ENABLED);

  const handleVerifyRecaptcha = useCallback((value) => {
    setIsRecaptchaVerified(value);
  }, []);

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

  const isCustomerFieldDataValid = useMemo(() => {
    const { firstName, lastName, phone, email, jobTitle } = fieldData;
    return Object.values({
      firstName,
      lastName,
      phone,
      email,
      jobTitle,
    }).every((fieldDatum) => !!fieldDatum.isValid);
  }, [fieldData]);

  const isCompanyFieldDataValid = useMemo(() => {
    const {
      companyName,
      companyAddress,
      companyCity,
      companyCountry,
      companyZipCode,
      companyState,
    } = fieldData;
    return Object.values({
      companyName,
      companyAddress,
      companyCity,
      companyZipCode,
      companyCountry,
      companyState,
    }).every((fieldDatum) => !!fieldDatum.isValid);
    //  && emailsTo.length
  }, [fieldData]);

  const handleCustomerSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isCustomerFieldDataValid || !isRecaptchaVerified) {
        return;
      }
      const requestData = getRequestData(fieldData);

      const requestBody = {
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        jobTitle: requestData.jobTitle,
        company: requestData.companyName,
        email: requestData.email,
        phone: `+${requestData.phone}`,
        notify: false,
        license: "disable",
      };
      try {
        setIsRequestPending(true);

        const result = await requestSignUp(requestBody);
        setContactResponse(result.data);
        setIsResponseSuccessful(true);
        setActiveStep(1);
      } catch (error) {
        if (error.response.status === 409) {
          setContactResponse(error.response.data);
          setIsResponseSuccessful(true);
          setActiveStep(1);
        }

        setIsResponseSuccessful(false);
        error.response && setResponseMessage(error.response.data.message);
        if (error.response.data?.data?.phone) {
          setFieldData((currentFieldData) => ({
            ...currentFieldData,
            phone: {
              ...currentFieldData.phone,
              lookType: "error",
              message: {
                text: "Our records show that you have already registered and evaluated Railflow.",
              },
            },
          }));
        }
      } finally {
        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, isCustomerFieldDataValid, isRecaptchaVerified]
  );

  const handleLicenseTypeChange = (e) => {
    setSelectedPlan(plans.filter(plan => plan.text === e.target.value)[0].id - 1);
  }

  const handleCompanySubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isCompanyFieldDataValid || !isRecaptchaVerified) {
        return;
      }
      
      const requestData = getRequestData(fieldData);

      const requestBody = {
        account_id: contactResponse.data.account_id,
        company_name: requestData.companyName,
        address: requestData.companyAddress,
        city: requestData.companyCity,
        state: requestData.companyState,
        zipcode: requestData.companyZipCode,
        country: requestData.companyCountry,
        email: contactResponse.data.email,
      };

      try {
        setIsRequestPending(true);

        // TODO implemented company sign up step
        const result = await requestAccount(requestBody);

        setAccountResponse(result.data);
        setIsResponseSuccessful(true);
        setActiveStep(2);
      } catch (error) {
        setIsResponseSuccessful(false);
        setResponseMessage(error.response.data.message);
      } finally {
        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, isCompanyFieldDataValid, isRecaptchaVerified]
  );

  const handleSummarySubmit = useCallback(
    async (event) => {
      event.preventDefault();
      
      const requestBody = {
        pay_method: buytype,
        email: contactResponse.data.email,
        support: true,
        license_years: selectedPlan + 1,
        license_type: "enterprise",
        num_users: 0
      };

      try {
        setIsRequestPending(true);

        const hiveageResult = await requestStripe(requestBody);

        if (buytype === "buy") {
          // router.push("/");
          setIsRequestPending(false);
          setIsResponseSuccessful(null);
          window.open(hiveageResult.data.payment_link);
        } else {

          setHiveageResponse(hiveageResult.data);
          setIsResponseSuccessful(true);
          setActiveStep(3);

          setIsRequestPending(false);
          setIsResponseSuccessful(null);
        }
      } catch (error) {
        setIsResponseSuccessful(false);
        error.response && setResponseMessage(error.response.data.message);

        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, contactResponse, selectedPlan]
  );

  const renderCustomerFields = () => {
    const showRecaptcha = process.env.RECAPTCHA_SITE_KEY;

    return (
      <form onSubmit={handleCustomerSubmit} autoComplete="off">
        <section className={cx("quoteForm_fieldContainer")}>
          {/* TODO: place form fields by mapping through array */}
          <div className={cx("quoteFormFieldGroup")}>
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              {...fieldData.firstName}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              {...fieldData.lastName}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
          </div>

          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            {...fieldData.email}
            onChange={handleChangeField}
          />
          <div className={cx("quoteFormFieldGroup")}>
            <PhoneField
              name="phone"
              label="Phone"
              placeholder="Phone"
              {...fieldData.phone}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
            <TextField
              type="text"
              name="jobTitle"
              label="Job Title"
              placeholder="Job Title"
              {...fieldData.jobTitle}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
          </div>
          <TextField
            type="text"
            name="companyName"
            label="Company Name"
            placeholder="Company Name"
            {...fieldData.companyName}
            onChange={handleChangeField}
          />
          {showRecaptcha && (
            <section className={cx("signUpForm_recaptchaContainer")}>
              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                onChange={handleVerifyRecaptcha}
                theme="dark"
              />
            </section>
          )}
        </section>
        <section className={cx("quoteForm_buttonContainer")}>
          <div />
          <Button
            type="submit"
            className={cx("quoteForm_submit")}
            isDisabled={!isCustomerFieldDataValid || !isRecaptchaVerified}
          >
            Next
          </Button>
        </section>
      </form>
    );
  };

  const renderCompanyFields = () => {
    return (
      <form onSubmit={handleCompanySubmit} autoComplete="off">
        <section className={cx("quoteForm_fieldContainer")}>
          <TextField
            type="text"
            name="companyName"
            label="Company Name"
            placeholder="Name"
            {...fieldData.companyName}
            inputProps={{ disabled: true }}
          />
          <TextField
            type="text"
            name="companyAddress"
            label="Address"
            placeholder="Address"
            {...fieldData.companyAddress}
            onChange={handleChangeField}
          />
          <div className={cx("quoteFormFieldGroup")}>
            <TextField
              type="text"
              name="companyCity"
              label="City"
              placeholder="City"
              {...fieldData.companyCity}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />

            <TextField
              type="text"
              name="companyState"
              label="State / Province"
              placeholder="State / Province"
              {...fieldData.companyState}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
          </div>
          <div className={cx("quoteFormFieldGroup")}>
            <TextField
              type="text"
              name="companyZipCode"
              label="Postal / Zip Code"
              placeholder="Postal / Zip Code"
              {...fieldData.companyZipCode}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
            <SelectField
              name="companyCountry"
              label="Country"
              placeholder="Country"
              {...fieldData.companyCountry}
              onChange={handleChangeField}
              className={cx("quoteFormFieldGroup_item")}
            />
          </div>
        </section>
        <section className={cx("quoteForm_buttonContainer")}>
          <Button
            onClick={() => setActiveStep(0)}
            className={cx("quoteForm_back")}
            inverse
          >
            Back
          </Button>
          <Button
            type="submit"
            className={cx("quoteForm_submit")}
            isDisabled={!isCompanyFieldDataValid}
          >
            Next
          </Button>
        </section>
      </form>
    );
  };

  const renderSummaryPage = () => {
    const renderYearsText = () => (
      <span>
        {plans[selectedPlan].text}
      </span>
    );
    const renderPrice = () => {
      let totalPrice = (basePrice * (selectedPlan + 1)).toString()
      if(totalPrice.length > 3) {
        totalPrice = totalPrice.charAt(0)+","+totalPrice.substring(1,4)
      }
      return <span>{totalPrice}</span>
    }
    
    return (
      <div className={cx("quoteForm_summary")}> 
        <div className={cx("quoteForm_summaryRow")}>
          <span className={cx("quoteForm_summaryRow_title")}>
            Annual Enterprise Support
          </span>
          <span
            className={cx(
              "quoteForm_summaryRow_value",
              "quoteForm_summaryRow_basePrice"
            )}
          >
            {basePrice.toLocaleString()}{" USD"}
          </span>
        </div>
        <div className={cx("quoteForm_summaryRow")}>
          <span className={cx("quoteForm_summaryRow_title")}>Number of Years</span>
          <FormControl style={{ minWidth: 180}}>
            <Select
              value={plans[selectedPlan].text}
              defaultValue={plans[selectedPlan].text}
              onChange={handleLicenseTypeChange}
              className={cx("quoteForm_select_title")}
            >
              {plans.map((plan) => (
                <MenuItem key={plan.id} value={plan.text}>
                  {plan.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={cx("quoteForm_summaryRow")}>
          <span className={cx("quoteForm_summaryRow_title")}>
            Total Price <span>for {renderYearsText()}</span>
          </span>
          <span
            className={cx(
              "quoteForm_summaryRow_value",
              "quoteForm_summaryRow_totalPrice"
            )}
          >
            {renderPrice()}{" USD"}            
          </span>
        </div>
        <section className={cx("quoteForm_buttonContainer")}>
          <Button
            onClick={() => setActiveStep(1)}
            className={cx("quoteForm_back")}
            inverse
          >
            Back
          </Button>
          <SecureButton
            type="submit"
            className={cx("quoteForm_submit")}
            onClick={handleSummarySubmit}
          >
            Secure Payment
          </SecureButton>
        </section>
      </div>
    );
  };

  return (
    // TODO: replace with common form component
    <div className={cx("quoteForm")}>
      <h2 className={cx("quoteForm_title")}>
        Railflow CLI - Enterprise Support
      </h2>

      <MuiStepper
        activeStep={activeStep}
        alternativeLabel
        className={cx("quoteForm_stepper")}
      >
        {stepLabels.map((label, idx) => (
          <MuiStep
            className={cx("quoteForm_step")}
            key={label}
            completed={activeStep > idx || activeStep === 3}
          >
            <MuiStepLabel className={cx("quoteForm_stepperLabel")}>
              {label}
            </MuiStepLabel>
          </MuiStep>
        ))}
      </MuiStepper>
      <div className={cx("quoteForm_container")}>
        {!isRequestPending && isResponseSuccessful !== null && (
          <div
            className={cx("quoteForm_messageContainer", {
              [`quoteForm_messageContainer__${
                isResponseSuccessful ? "success" : "failure"
              }`]: true,
            })}
          >
            {responseMessage}
          </div>
        )}
        {isRequestPending && (
          <div className={cx("quoteForm_loadingContainer")}>
            <div className={cx("quoteForm_spinner")} />
            <div>
              {buytype === "quote"
                ? activeStep === 3
                  ? `Generating quote for ${contactResponse.data.company_name}`
                  : `Processing, please wait ...`
                : "Processing, please wait ..."}
            </div>
          </div>
        )}

        {!isRequestPending &&
          isResponseSuccessful === null && (
            <>
              {activeStep === 0 && renderCustomerFields()}
              {activeStep === 1 && renderCompanyFields()}
              {activeStep === 2 && renderSummaryPage()}
            </>
          )}
      </div>
    </div>
  );
};

export default QuoteFrom;
