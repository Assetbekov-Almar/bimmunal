import { headerType } from '../services/config'

export const isAccessToken = () => {
	return !!localStorage.getItem(headerType.ACCESS_TOKEN)
}
