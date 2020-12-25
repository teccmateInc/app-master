export const apiRoot = `${location.protocol}//${location.host}/api`

export const userId = '1'
export const MAIN_NAV = [
  {
    name: 'POLICIES',
    key: 'policies',
  },
  {
    name: 'COMP PLANS',
    key: 'comp-plans',
  },
  {
    name: 'REPORTS',
    key: 'analytics',
  },
  {
    name: 'DATA',
    key: 'data',
    path: 'contacts',
  },
  {
    name: 'HELP',
    key: 'help-contacts',
  },
  {
    name: 'PROFILE',
    key: 'profile',
  },
]

export const ADMIN_NAV = [
  {
    name: 'ALL USERS',
    key: 'allUsers',
  },
]

export const DATA_NAV = [
  {
    name: 'Clients',
    key: 'contacts',
  },
  {
    name: 'Carriers',
    key: 'carriers',
  },
  {
    name: 'Producers',
    key: 'producers',
  },
  {
    name: 'Products',
    key: 'products',
  },
]
export const REPORTS_NAV = [
  {
    name: 'Analytics',
    key: 'analytics',
  },
  {
    name: 'Revenue Projection',
    key: 'revenue-projections',
  },
  {
    name: 'Expected Commission',
    key: 'expected-commissions',
  },
  {
    name: 'Pending Commission',
    key: 'pending-commissions',
  },
]
export const HELP_NAV = [
  {
    name: 'Data',
    key: 'help-contacts',
  },
  {
    name: 'Comp Plans',
    key: 'help-comp',
  },
  {
    name: 'Reports',
    key: 'help-reports',
  },
  {
    name: 'Contact Us',
    key: 'help-contact-us',
  },
]

export const UNAUTHENTICATED_PAGES = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/signup',
]
export const ASSISTANTS_UNAUTHORIZED_PAGES = [
  '/profile',
  '/analytics',
  '/revenue-projections',
  '/expected-commissions',
  '/pending-commissions',
]

export const STATUS_OPTIONS = {
  A: 'Active',
  P: 'Pending',
  T: 'Termed',
}
export const MODE_OPTIONS = {
  A: 'A',
  SA: 'SA',
  Q: 'Q',
  M: 'M',
}
export const MODE_OPTIONS_NAME = {
  A: 'Annual',
  SA: 'Semi Annual',
  Q: 'Quarterly',
  M: 'Monthly',
}
export const PLAN_OPTIONS = {
  P: '% of Premium',
  G: 'Graded',
  F: 'Fee',
  T: 'Target',
}
export const CALCULATE_OPTIONS = {
  PC: 'Paid Commissions',
  AP: 'Annualized Premium',
}
export const PRIMARY_FIELD_OPTIONS = {
  PR: 'Producers',
  CA: 'Carriers',
  CO: 'Clients',
  CM: 'Companies',
  PO: 'Products',
  TY: 'Types',
}
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'
export const STATUS_FAILURE = 'failure'
