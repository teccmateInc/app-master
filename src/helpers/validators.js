import { emailValidation, passwordValidation, phoneValidation, zipValidation } from './util'

export function validateFirstLast (values) {
  const errors = {}
  if (!values?.firstName?.trim()) {
    errors.firstName = 'error'
  }
  if (!values?.lastName?.trim()) {
    errors.lastName = 'error'
  }

  return errors
}

export function validateName (values) {
  const errors = {}
  if (!values?.name?.trim()) {
    errors.name = 'error'
  }

  return errors
}

export function validateLoginForm (values) {
  return values?.username?.length > 0 && values?.password?.length > 0
}

export function validateProfileFields (values) {
  const errors = {}

  // require firstName
  if (!values?.firstName?.trim()) {
    errors.firstName = 'First name cannot be blank'
  }
  // require lastName
  if (!values?.lastName?.trim()) {
    errors.lastName = 'Last name cannot be blank'
  }
  // require addr1
  if (!values?.addr1?.trim()) {
    errors.addr1 = 'Address 1 cannot be blank'
  }
  // require city
  if (!values?.city?.trim()) {
    errors.city = 'City cannot be blank'
  }
  // require state
  if (!values?.state?.trim()) {
    errors.state = 'State cannot be blank'
  }
  // require zip
  if (!values?.zip?.trim() || !zipValidation(values.zip)) {
    errors.zip = 'Not a valid 5 digit zip'
  }
  // require phone
  if (!values?.phone?.trim() || !phoneValidation(values.phone)) {
    errors.phone = 'Not a valid phone number'
  }

  return errors
}

export function validateSignupFields (values) {
  const errors = validateProfileFields(values)

  // require email
  if (!values?.email?.trim() || !emailValidation(values.email)) {
    errors.email = 'Not a valid email address'
  }
  // require password
  if (!values?.encPwd?.trim() || !passwordValidation(values.encPwd)) {
    errors.encPwd = 'Password needs to be at least 6 char, contain number and upper case letter'
  }
  // verify new_password and verify_password match
  if (values.encPwd !== values.verifyPassword) {
    errors.verifyPassword = 'Passwords do not match'
  }
  // require priceTierId
  if (values?.priceTierId !== parseInt(values?.priceTierId, 10)) {
    errors.priceTierId = 'Subscription plan must be selected'
  }

  return errors
}
