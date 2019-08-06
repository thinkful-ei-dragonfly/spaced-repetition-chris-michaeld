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
              : console.log(res.json())
          )
      },
}

export default LanguageService