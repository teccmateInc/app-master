import { node } from 'prop-types'
import React, { useCallback, useContext, useState } from 'react'
import { LoadingContext } from '../../components/LoadingContext'
import { postAuthWrapper, postWrapper } from '../../helpers/api'
import { STATUS_FAILURE, STATUS_SUCCESS } from '../../helpers/constants'
import AuthContext from './AuthContext'
toastr.options.closeButton = true

const AuthProvider = ({ children }) => {
  let prevUser = localStorage.getItem('user')
  const [lastUserName, setLastUserName] = useState(
    localStorage.getItem('prevUser') ? localStorage.getItem('prevUser') : null
  )

  const [authenticatedUser, setAuthenticatedUser] =
    // useState({
    //   status: 'A',
    //   userType: 'R',
    // })
    useState(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    )

  const setUser = useCallback(
    (user) => {
      setAuthenticatedUser(user)
      if (user == null) {
        // localStorage.removeItem('user')
      } else {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    [authenticatedUser]
  )

  const loadingWrapper = useContext(LoadingContext)

  const login = useCallback(
    (username, password) =>
      loadingWrapper(async () => {
        try {
          if (!authenticatedUser) {
            const { status, data } = await postAuthWrapper(
              '/login',
              `username=${encodeURIComponent(
                username
              )}&password=${encodeURIComponent(password)}`
            )

            if (status === STATUS_SUCCESS) {
              setUser(data)
            } else {
              if (status === STATUS_FAILURE) {
                toastr.error('Invalid email or password.')
              } else {
                toastr.error(
                  'Problem logging in. Please wait a few minutes and try again.'
                )
              }
              setUser(null)
            }
          }
        } catch (err) {
          console.log(
            'Problem communicating with server. Please wait a few minutes and try again.'
          )
          toastr.error(
            'Problem communicating with server. Please wait a few minutes and try again.'
          )
          setUser(null)
          throw err
        }
      }),
    [authenticatedUser]
  )

  const logout = useCallback(
    () =>
      loadingWrapper(async () => {
        try {
          console.log('LOGOUT')
          const { status, data } = await postWrapper('/logout')
        } catch (err) {
          toastr.error(
            'Problem communicating with server. Please wait a few minutes and try again.'
          )
          console.log('err', err)
          throw err
        }
        setUser(null)
      }),
    []
  )

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        login,
        logout,
        lastUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: node.isRequired,
}

export default AuthProvider
