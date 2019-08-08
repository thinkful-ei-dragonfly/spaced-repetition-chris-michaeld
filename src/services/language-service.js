import config from '../config'
import TokenService from './token-service'

const LanguageService = {
    getUserInfo() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getNextWord() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postGuess(guess) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({guess}),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
}

export default LanguageService