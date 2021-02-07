import useDocumentTitle from '@tanem/use-document-title'
import { AuthContext, } from 'components'
import React, { useContext } from 'react'
import { AuthenticatedApp, UnauthenticatedApp } from '.'


const App = () => {
    const {
        authenticatedUser
    } = useContext(AuthContext)

    useDocumentTitle('Agency Comp')

    return (
        <div>
            {authenticatedUser &&
            <AuthenticatedApp/>
            }
            {!authenticatedUser &&
            <UnauthenticatedApp/>
            }
        </div>
    )
}

export default App
