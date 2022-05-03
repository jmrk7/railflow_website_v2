import fieldLookTypes from "../../src/constants/field-look-types"
import {
  validateRequiredField,
  validateEmailField,
  validatePhoneField,
} from "../../utils/validate-fields"

export const validateField = (name, value) => {
  switch (name) {
    case "email":
      return validateEmailField(value)
    case "phone":
      return validatePhoneField(value)
    // INFO: skip validation for company and analytics platform fields, as they are optional.
    case "company":
      return validateRequiredField(value)
    case "analyticsPlatform":
      return {
        isValid: true,
        lookType: fieldLookTypes.default,
        message: { text: "" },
      }
    default:
      return validateRequiredField(value)
  }
}

export const formatFieldValue = (name, value, previousValue) => {
  // INFO: prevent from adding value longer than 20 characters.
  if (["firstName", "lastName"].includes(name) && value && value.length >= 20) {
    return value.slice(0, 21)
  }

  if (value && typeof value === "string" && value.length >= 40) {
    return value.slice(0, 41)
  }

  return value
}

export const getRequestData = fieldData => {
  const requestData = Object.keys(fieldData).reduce(
    (currentRequestData, fieldName) => {
      // INFO: exclude terms aggrement field from request data
      if (fieldName === "termsAgreement") {
        return currentRequestData
      }

      return {
        ...currentRequestData,
        [fieldName]: fieldData[fieldName].value,
      }
    },
    {}
  )

  return requestData
}
