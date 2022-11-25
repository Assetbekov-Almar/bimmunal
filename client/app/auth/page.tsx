import AuthForm from './AuthForm'
import AuthService from '../../services/api/Auth'
import { UserInfo } from '../../models/auth'
import { redirect } from 'next/navigation'

const Auth = async () => {
	const isTokenValid: UserInfo | boolean = await AuthService.check()

	if (!isTokenValid) {
		redirect('/')
	}

	return <AuthForm />
}

export default Auth
