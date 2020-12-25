import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import Header from '../components/header/Header'
import AllUsersPage from './pages/AllUsersPage'
import AnalyticsPage from './pages/AnalyticsPage'
import CarriersPage from './pages/CarriersPage'
import CompPlansPage from './pages/CompPlansPage'
import ContactsPage from './pages/ContactsPage'
import DataContactsPage from './pages/DataContactsPage'
import ExpectedCommissionsPage from './pages/ExpectedCommissionsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HelpCompPage from './pages/HelpCompPage'
import HelpContactsPage from './pages/HelpContactsPage'
import HelpContactUsPage from './pages/HelpContactUsPage'
import HelpReportsPage from './pages/HelpReportsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LookupPage from './pages/LookupPage'
import PendingCommissionsPage from './pages/PendingCommissionsPage'
import ProducersPage from './pages/ProducersPage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
import ReportsPage from './pages/ReportsPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import RevenueProjectionsPage from './pages/RevenueProjectionsPage'
import SignUpPage from './pages/SignUpPage'


const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <Header/>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/profile" component={ProfilePage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/forgot_password" component={ForgotPasswordPage}/>
            <Route exact path="/reset_password" component={ResetPasswordPage}/>
            <Route exact path="/contacts" component={ContactsPage}/>
            <Route exact path="/compplans" component={CompPlansPage}/>
            <Route exact path="/reports" component={ReportsPage}/>
            <Route exact path="/lookup" component={LookupPage}/>
            <Route exact path="/data" component={DataContactsPage}/>
            <Route exact path="/carriers" component={CarriersPage}/>
            <Route exact path="/producers" component={ProducersPage}/>
            <Route exact path="/products" component={ProductsPage}/>
            <Route exact path="/analytics" component={AnalyticsPage}/>
            <Route exact path="/revenue_projections" component={RevenueProjectionsPage}/>
            <Route exact path="/expected_commissions" component={ExpectedCommissionsPage}/>
            <Route exact path="/pending-commissions" component={PendingCommissionsPage}/>
            <Route exact path="/help_contacts" component={HelpContactsPage}/>
            <Route exact path="/help_comp" component={HelpCompPage}/>
            <Route exact path="/help_reports" component={HelpReportsPage}/>
            <Route exact path="/help_contact_us" component={HelpContactUsPage}/>

            <Route exact path="/all_users" component={AllUsersPage}/>
            {/* <DevTools/> */}
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
