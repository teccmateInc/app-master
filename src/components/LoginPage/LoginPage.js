import useDocumentTitle from '@tanem/use-document-title'
import { AuthContext } from 'components'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const { login, lastUserName } = useContext(AuthContext)

  useDocumentTitle('Agency Comp - Login')
  let history = useHistory()

  const [errors, setErrors] = useState({ email: null, password: null })
  const [username, setUsername] = useState(lastUserName ? lastUserName : '')
  const [password, setPassword] = useState('')

  useEffect(() => {
    let prevUser = localStorage.getItem('prevUser')
    if (prevUser) setUsername(prevUser)
  }, [])

  const submitForm = async (e) => {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    e.preventDefault()
    if (
      username.trim() === '' ||
      regex.test(username) === false ||
      username === null
    ) {
      setErrors({ ...errors, email: 'Invalid E-Mail!' })
    } else if (password.trim() === '' || username === null) {
      setErrors({ email: null, password: 'Invalid Password!' })
    } else {
      try {
        console.log('LoginPage submitForm 1')
        await login(username, password)
        console.log('LoginPage submitForm 2')
        history.push('/contacts')
        setErrors({ email: null, password: null })
        console.log('LoginPage submitForm 3')
      } catch (err) {
        // TODO replace with toastr call
        setError(err.message || 'uncaught error')
        console.log(err.message)
      }
    }
  }

  return (
    <div>
      <div className={'login-page'}>
        <div className="login-logo-container">
          <div className="login-logo" />
        </div>
        {/* TODO add CSS class*/}
        <div style={{ padding: '40px 60px' }}>
          <Form>
            {/*onSubmit={this.onSubmit}>*/}
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                isInvalid={errors.email && true}
                id="username"
                type="email"
                value={username ? username : ''}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus={!username}
                autoComplete={'username'}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <Form.Control.Feedback>
                <span
                  className="fa fa-envelope login-icons"
                  style={{
                    fontSize: '25px',
                    color: '#CCCCCC',
                  }}
                />
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                isInvalid={errors.password && true}
                id="password"
                value={password ? password : ''}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus={username ? true : false}
                autoComplete={'current-password'}
              />
              {errors.password && (
                <p style={{ color: 'red' }}>{errors.password}</p>
              )}
              <Form.Control.Feedback>
                <span
                  className="fa fa-lock"
                  style={{
                    fontSize: '28px',
                    color: '#CCCCCC',
                  }}
                />
              </Form.Control.Feedback>
            </Form.Group>
            {/*<LinkContainer to="/forgot_password" style={{padding: '0'}}>*/}
            {/*    <Button variant="link" type="button" onClick={this.forgotPassword}>*/}
            {/*        Forgot Password?*/}
            {/*    </Button>*/}
            {/*</LinkContainer>*/}
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="primary"
                id="LOGIN"
                type="submit"
                style={{ float: 'right' }}
                disabled={false}
                // disabled={!validateLoginForm({username, password})}
                onClick={(e) => submitForm(e)}
              >
                LOGIN
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

// TODO check and possibly reimplement logic below
// class LoginPage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: '',
//             password: '',
//         }
//
//         this.onSubmit = this.onSubmit.bind(this)
//         this.forgotPassword = this.forgotPassword.bind(this)
//     }
//
//     componentWillMount() {
//         this.setState({username: this.props.loginUsername})
//     }
//
//     onSubmit(event) {
//         event.preventDefault()
//         this.props.loginRequest(this.state)
//             .then((response) => {
//                 if (response.ok) {
//                     // Loading initial data after login for EditPlanModal
//                     this.props.pricingTiersRequest()
//                     this.props.loadContactsData('/contacts')
//                     this.props.currentUserRequest()
//                         .then(userData => {
//                             if (userData.response.user.userType === 'S') {
//                                 this.props.history.push('/all_users')
//                             } else if (userData.response.user.status !== 'A') {
//                                 this.props.history.push('/profile')
//                             } else {
//                                 this.props.history.push('/contacts')
//                             }
//                         })
//                 } else
//                     toastr.error('Invalid username or password')
//             })
//         return false
//     }
//
//     // forgotPassword() {
//     //     this.props.logoutRequest()
//     // }
// }
