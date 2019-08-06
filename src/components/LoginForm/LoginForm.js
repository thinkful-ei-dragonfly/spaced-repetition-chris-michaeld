import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'

import {  } from "@fortawesome/free-solid-svg-icons";
import {  } from "@fortawesome/react-fontawesome";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
       className='LoginForm'
       id="form-container"
       onSubmit={this.handleSubmit}
     >
       <div role='alert'>
         {error && <p>{error}</p>}
       </div>
       <div>
         <span className="fas fa-user"></span>
         <Label htmlFor='login-username-input' className="input">
         Username
         </Label>
         <Input
           ref={this.firstInput}
           id='login-username-input'
           name='username'
           placeholder='Username'
           required
         />
       </div>
       <div>
         <span className="fas fa-lock"></span>
         <Label htmlFor='login-password-input' className="input">
           Password
         </Label>
         <Input
           id='login-password-input'
           name='password'
           type='password'
           placeholder='Password'
           required
         />
       </div>
       <div className="form-footer">
       <Button type="submit" className="loginButton">
        Login
       </Button>
       </div>
     </form>
    )
  }
}

export default LoginForm
