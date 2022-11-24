import { headerType } from '../services/config'

export const saveTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem(headerType.ACCESS_TOKEN, accessToken)
	localStorage.setItem(headerType.REFRESH_TOKEN, refreshToken)
}
