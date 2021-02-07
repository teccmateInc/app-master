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

const DATA_AGENTS_SUB_MENU = [
  {
    name: 'Detail',
    key: 'detail',
  },
  {
    name: 'Policies',
    key: 'policies',
  },
  {
    name: 'Licenses',
    key: 'licenses',
  },
  {
    name: 'Appointments',
    key: 'appointments',
  },
  {
    name: 'E&O',
    key: 'e&o',
  },
  {
    name: 'Commissions',
    key: 'commissions',
  },
]

const DATA_SUB_MENU = [
  {
    name: 'Individuals',
    key: 'individuals',
  },
  {
    name: 'Groups',
    key: 'groups',
  },
  {
    name: 'Carriers',
    key: 'carriers',
  },
  {
    name: 'Agents',
    key: 'agents',
    sub_menu: DATA_AGENTS_SUB_MENU,
  },
  {
    name: 'Agencies',
    key: 'agencies',
  },
  {
    name: 'Types/Sub-Types',
    key: 'Types/Sub-Types',
  },
]

const COMMISSION_COMP_PALNS_SUB_MENU = [
  {
    name: '% of Premium',
    key: 'contacts',
    path: 'percent-of-premium',
  },
  {
    name: 'Graded',
    key: 'graded',
  },
  {
    name: 'Fee',
    key: 'fee',
  },
  {
    name: 'MA/PDP',
    key: 'ma/pdp',
  },
  {
    name: 'Target Premium',
    key: 'target-premium',
  },
]

const COMMISSION_SUB_MENU = [
  {
    name: 'Comp Plans',
    key: 'contacts',
    sub_menu: COMMISSION_COMP_PALNS_SUB_MENU,
  },
  {
    name: 'Import',
    key: 'import',
  },
  {
    name: 'Posting',
    key: 'posting',
    path: 'posting',
  },
  {
    name: 'Statements',
    key: 'statements',
    path: 'statements',
  },
]

const REPORTS_SUB_MENU = [
  {
    name: 'Analytics',
    key: 'analytics',
  },
  {
    name: 'Revenue Projection',
    key: 'revenue-projections',
  },
  {
    name: 'Expected vs Actual',
    key: 'expected-commissions',
  },
  {
    name: 'Missing',
    key: 'missing',
  },
  {
    name: 'Debit',
    key: 'debit',
  },
  {
    name: 'Pending',
    key: 'pending',
  },
]

const Agency_Pay_SUB_MENU = [
  {
    name: 'Comp Splits',
    key: 'comp-splits',
  },
  {
    name: 'Commission Statements',
    key: 'commission-statements',
  },
  {
    name: 'Reports',
    key: 'reports',
  },
]

export const SIDE_MENU = [
  {
    name: 'Home',
    key: 'contacts',
  },
  {
    name: 'POLICIES',
    key: 'policies',
  },
  {
    name: 'DATA',
    key: 'data',
    path: 'contacts',
    sub_menu: DATA_SUB_MENU,
  },
  {
    name: 'Commissions',
    key: 'commissions',
    path: 'expected-commissions',
    sub_menu: COMMISSION_SUB_MENU,
  },
  {
    name: 'Reports',
    key: 'help-reports',
    sub_menu: REPORTS_SUB_MENU,
  },
  {
    name: 'Agency Pay',
    key: 'agency-pay',
    path: 'expected-commissions',
    sub_menu: Agency_Pay_SUB_MENU,
  },
  {
    name: 'Help',
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

export const DEFAULT_INCORRECT_INPUT_MESSAGE = 'Incorrect input provided';