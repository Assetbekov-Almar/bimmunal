import { Login, User } from '../../../models/auth'
import { authConfig } from './config'
import { saveTokens } from '../../../utils/saveTokens'
import { headerType } from '../../config'

class AuthService {
	async login(userData: Login) {
		const response = await fetch(authConfig.LOGIN, {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		if (!response.ok) {
			throw (data as { error: string }).error
		}

		const { accessToken, refreshToken } = data as User

		saveTokens(accessToken, refreshToken)

		return data
	}

	async check() {
		const accessToken = localStorage.getItem(headerType.ACCESS_TOKEN)
		if (accessToken) {
			const response = await fetch(authConfig.CHECK, {
				headers: {
					accessToken: accessToken,
				},
			})
			return response.ok
		}
		return false
	}
}

export default new AuthService()
