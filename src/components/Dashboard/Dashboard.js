import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext';

export default class Dashboard extends Component {
    static contextType = UserContext

    componentDidMount() {
        const user = this.context.user.id;

        this.setState({ error: null })
        LanguageService.getUserInfo()
    }
    renderUserInfo = () => {
        console.log(this.context.user)
        return (
            <div>
                <p>{this.context.user.name}'s stats and information:</p>
                ID NUMBER: {this.context.user.id}
            </div>
        )
    }
    
    render() {
        return (
            <>
                <h2>Dashboard</h2>
                {this.renderUserInfo()}
            </>
        )
    }
}