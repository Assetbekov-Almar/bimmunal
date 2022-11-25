import { headerType } from '../services/config'
import { setCookie } from 'cookies-next'

export const saveTokens = (accessToken: string, refreshToken: string) => {
	setCookie(headerType.ACCESS_TOKEN, accessToken, { maxAge: 60 * 60 * 24 * 15 })
	setCookie(headerType.REFRESH_TOKEN, refreshToken, { maxAge: 60 * 60 })
}
