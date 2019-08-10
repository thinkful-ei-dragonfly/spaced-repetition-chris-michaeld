import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  language: {},
  words: [],
  nextWord: {},
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  setWords: () => [],
  setNextWord: () => { },
  setLanguage: () => { },
  processLogin: () => { },
  handleSubmit: () => { },
  processLogout: () => { },
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      error: null,
      language: {},
      words: [],
      nextWord: {},
      answer: {},
      isCorrect: 1,
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setLanguage = language => {
    this.setState({ language })
  }

  setWords = words => {
    this.setState({ words })
  }

  setNextWord = word => {
    console.log(word)
    this.setState({ nextWord: word })
  }

  setAnswer = answer => {
    console.log(answer)
    this.setState({ answer })
  }

  handleSubmit = answer => {
    console.log(answer)
    this.setState({
      answer : answer
    })
  }

  // setIsCorrect = answer => {
  //   if (!answer) {

  //   }
  //   if (answer === true) {
  //     this.setState({ isCorrect: 1 })
  //   } else if (answer === true) {
  //     this.setState({ isCorrect: 2 })
  //   }
  // }


  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    IdleService.registerIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      words: this.state.words,
      language: this.state.language,
      nextWord: this.state.nextWord,
      answer: this.answer,
      isCorrect: this.isCorrect,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setAnswer: this.setAnswer,
      setNextWord: this.setNextWord,
      setIsCorrect: this.setIsCorrect,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      handleSubmit: this.handleSubmit,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
