import AuthForm from './AuthForm'
import AuthService from '../../services/api/Auth'
import { UserInfo } from '../../models/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { headerType } from '../../services/config'

const Auth = async () => {
	const nextCookies = cookies()
	const accessToken = nextCookies.get(headerType.ACCESS_TOKEN)?.value as string | undefined
	const isTokenValid: UserInfo | boolean = await AuthService.check(accessToken)

	if (isTokenValid) {
		redirect('/')
	}

	return <AuthForm />
}

export default Auth
