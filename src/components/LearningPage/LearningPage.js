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
    <h2>{nextWord.nextWord}</h2>
    <h4>Current Score: {nextWord.totalScore}</h4>
  </div>
  )
}

  static contextType = UserContext
  render() {
    return (
      <>
      {this.renderNextWord()}
      </>
    )
  }

}