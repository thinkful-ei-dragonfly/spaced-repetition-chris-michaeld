import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service'

export default class LearningPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {},
      isCorrect: null,
      guess: null,
    }
  }

  static contextType = UserContext

  componentDidMount() {
    setTimeout(() => {
      this.setState({ error: null })
      LanguageService.getNextWord()
        .then(res => {
          this.context.setNextWord(res)
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }, 600)
  }

  handleNextClick = () => {
    this.setState({
      isCorrect: null,
      answer: {},
    })
    LanguageService.getNextWord()
        .then(res => {
          this.context.setNextWord(res)
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { guess } = ev.target
    this.setState({
      guess: guess.value
    })
    LanguageService.postGuess({
      guess: guess.value
    })
      .then(res => {
        this.setState({
          answer: res,
          isCorrect: res.isCorrect,
        })
        this.context.handleSubmit(this.state.answer)
        console.log(this.context)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
      LanguageService.getNextWord()
      .then(res => {
        this.context.setNextWord(res)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }


  renderNextWord() {
    const { nextWord = {} } = this.context
    return (
      <div>
        <h2>Translate the word:</h2>
        <span>{nextWord.nextWord}</span>
        <p>Your total score is: {nextWord.totalScore}</p>
      </div>
    )
  }

  renderForm() {
    return (
      <form className="enterGuess" onSubmit={this.handleSubmit}>
        <Label for='learn-guess-input'>What's the translation for this word?</Label>
        <Input type="text" id='learn-guess-input' className='guessInput' name="guess" required></Input>
        <Button type="submit">Submit your answer</Button>
      </form>
    )
  }

  renderScore() {
    const { nextWord = {} } = this.context
    return (
      <div>
        <p>You have answered this word correctly {nextWord.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {nextWord.wordIncorrectCount} times.</p>
      </div>
    )
  }

  renderCorrect() {
    const { nextWord = {} } = this.context
    return (
      <>
      <div className='DisplayScore'>
        <p>Your total score is: {nextWord.totalScore}</p>
        <h2>You were correct! :D</h2>
      </div>
      <div className='DisplayFeedback'>
        <p>The correct translation for {this.context.nextWord.nextWord} was {this.state.answer.answer} and you chose {this.state.guess}!</p>
        <Button type='button' onClick={this.handleNextClick}>
          Try another word!
        </Button>
      </div>
      </>
    )
  }

  renderIncorrect() {
    const { nextWord = {} } = this.context
    return (
      <>
      <div className='DisplayScore'>
        <p>Your total score is: {nextWord.totalScore}</p>
        <h2>Good try, but not quite right :(</h2>
      </div>
      <div className='DisplayFeedback'>
        <p>The correct translation for {this.context.nextWord.nextWord} was {this.state.answer.answer} and you chose {this.state.guess}!</p>
        <Button type='button' onClick={this.handleNextClick}>
          Try another word!
        </Button>
      </div>
      </>
      )
      
  }

  determineRender() {
    const answer = this.state.answer
    if (Object.entries(answer).length === 0 && answer.constructor === Object) {
      return (
        <>
          {this.renderNextWord()}
          {this.renderForm()}
          {this.renderScore()}
        </>
      )
    }
    else if (this.state.isCorrect) {
      return (
        <>
          {this.renderCorrect()}
        </>
      )
    } else if (!this.state.isCorrect) {
      return (
        <>
          {this.renderIncorrect()}
        </>
      )
    }
  }
  render() {
    return (
      <>
        {this.determineRender()}
      </>
    )
  }

}