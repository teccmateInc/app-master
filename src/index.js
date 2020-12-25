import { App } from 'components/App'
import GlobalErrorBoundary from 'components/GlobalErrorBoundary'
import { LoadingProvider } from 'components/LoadingContext'
import { PopoverProvider } from 'components/PopoverContext'
import { AuthProvider } from 'providers/auth'
import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { CookiesProvider } from 'react-cookie'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'regenerator-runtime/runtime.js'
import 'whatwg-fetch'

require('!style-loader!css-loader!sass-loader!./style/app.scss')

toastr.options.closeButton = true
toastr.options.timeOut = 3000 // How long the toast will display without user interaction
toastr.options.extendedTimeOut = 500 // How long the toast will display after a user hovers over it
toastr.options.toastClass = 'toastr'

// const store = configureStore()
const store = null

render(
  <GlobalErrorBoundary>
    <LoadingProvider>
      <PopoverProvider>
        <CookiesProvider>
          <AuthProvider>
            <Router>
              <App />
            </Router>
          </AuthProvider>
        </CookiesProvider>
      </PopoverProvider>
    </LoadingProvider>
  </GlobalErrorBoundary>,
  document.getElementById('app')
)
