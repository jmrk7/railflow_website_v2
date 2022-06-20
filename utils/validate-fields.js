import fieldLookTypes from "../src/constants/field-look-types"

export const validateRequiredField = value => {
  return {
    isValid: !!value,
    lookType: fieldLookTypes[!!value ? "default" : "error"],
    message: {
      text: !!value ? "" : "This field is required.",
    },
  }
}

// eslint-disable-next-line
const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// eslint-disable-next-line
const corporateEmailValidationRegex = /^([\w-\.]+@(?!gmails.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)(?!mailinator.com)([\w-]+\.)+[\w-]{2,4})?$/

export const validateEmailField = value => {
  if (value === "") {
    return validateRequiredField(value)
  }

  const isEmail = emailValidationRegex.test(value)
  const isCorporateEmail = corporateEmailValidationRegex.test(value)

  let messageText = ""

  if (!isEmail) {
    messageText = "Please enter a valid email."
  } else if (!isCorporateEmail) {
    messageText = "Please use your corporate email."
  }

  return {
    isValid: isCorporateEmail,
    lookType: fieldLookTypes[isCorporateEmail ? "default" : "error"],
    message: { text: messageText },
  }
}

const phoneValidationRegex = /1?\s?((\(\d{3}\))|(\d{3}))(-|\s)?\d{3}(-|\s)?\d{4}/

export const validatePhoneField = value => {
  if (value === "") {
    return validateRequiredField(value)
  }

  const isValid = phoneValidationRegex.test(value)

  return {
    isValid,
    lookType: fieldLookTypes[isValid ? "default" : "error"],
    message: { text: isValid ? "" : "Please enter a valid phone number." },
  }
}
