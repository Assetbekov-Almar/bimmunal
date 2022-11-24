import { Login, User } from '../../../models/auth'
import { authConfig } from './config'
import { saveTokens } from '../../../utils/saveTokens'

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

		//saveTokens(accessToken, refreshToken)

		return data
	}
}

export default new AuthService()
