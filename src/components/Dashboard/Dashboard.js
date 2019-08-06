import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext';

export default class Dashboard extends Component {
    static contextType = UserContext

    componentDidMount() {
        setTimeout( () => {
        this.setState({ error: null })
        LanguageService.getUserInfo()
        .then(res => {
            this.context.setLanguage(res.language)
            this.context.setWords(res.words)
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
        },600)
        
    }

    renderUserInfo = () => {
        return (
                <p>{this.context.user.name}'s stats and information:</p>
        )
    }

    renderSubHeading = () => {
        const {words = []} = this.context
        const list = words.map(word => {
            return <li key={word.id} className="wordListItem">
            Word {word.id} {word.original} 
            <br/>
            correct answer count: {word.correct_count} 
            <br/>
            incorrect answer count: {word.incorrect_count}
            </li>
        })
        console.log(this.context.words)
        return (
            <>
            <h3>Words to practice</h3>
            <ul className="wordList">
            {list}
            </ul>
            </>
        )
    }
    
    render() {
        return (
            <>
                <h2>Dashboard</h2>
                {this.renderUserInfo()}
                {this.renderSubHeading()}
            </>
        )
    }
}