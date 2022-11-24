import AuthForm from './AuthForm'
import AuthService from '../../services/api/Auth'
import { User } from '../../models/auth'
import { redirect } from 'next/navigation'

const Auth = async () => {
	const userData: User | { error: string } = await AuthService.login({
		email: 'almar.asetbekov@gmail.com',
		password: '123456',
	})

	if (userData?.accessToken) {
		redirect('/')
	}

	return <AuthForm />
}

export default Auth
