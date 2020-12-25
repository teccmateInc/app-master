import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CarriersPage } from '../carriers'
import { ContactsPage } from '../contacts'
import { HelpNavigation, MainNavigation } from '../Navigation'
import { ProducersPage } from '../producers'
import { ProductsPage } from '../products'
import { PoliciesPage } from '../policies'
import {CompPlansPage} from '../compPlans'

const AuthenticatedApp = () => {
  return (
    <div>
      <MainNavigation/>
      <Switch>
        <Route exact={true} path='/'>
          <PoliciesPage/>
        </Route>
        <Route exact={true} path='/carriers'>
          <CarriersPage/>
        </Route>
        <Route exact={true} path='/comp-plans'>
          <CompPlansPage/>
        </Route>
        <Route exact={true} path='/contacts'>
          <ContactsPage/>
        </Route>
        <Route exact={true} path='/data'>
          <ContactsPage/>
        </Route>
        <Route exact={true} path='/help'>
          <ContactsPage/>
          <HelpNavigation/>
        </Route>
        <Route exact={true} path='/policies'>
          <PoliciesPage/>
        </Route>
        <Route exact={true} path='/producers'>
          <ProducersPage/>
        </Route>
        <Route exact={true} path='/products'>
          <ProductsPage/>
        </Route>
      </Switch>
    </div>
  )
}

export default AuthenticatedApp
