import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service'

export default class LearningPage extends Component {

  componentDidMount() {
    setTimeout( () => {
    this.setState({ error: null })
    LanguageService.getNextWord()
    .then(res => {
        this.context.setNextWord(res)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    },600) 
}

renderNextWord() {
  const {nextWord = {}} = this.context
  console.log(nextWord)
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
    <form className="enterGuess">
    <Label for='learn-guess-input'>What's the translation for this word?</Label>
    <Input type="text" id='learn-guess-input' className='guessInput' required></Input>
    <Button type="submit">Submit your answer</Button>
    </form>
  )
}

renderScore() {
  const {nextWord = {}} = this.context
  return (
    <div>
    <p>You have answered this word correctly {nextWord.wordCorrectCount} times.</p>
    <p>You have answered this word incorrectly {nextWord.wordIncorrectCount} times.</p>
    </div>
  )
}

  static contextType = UserContext
  render() {
    return (
      <>
      {this.renderNextWord()}
      {this.renderForm()}
      {this.renderScore()}
      </>
    )
  }

}