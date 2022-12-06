import { useMutation } from '@tanstack/react-query'
import { Auth, ForgotPassword, Login, ResetPassword } from '../../models/auth'
import AuthService from '../../services/api/Auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = () => {
	const router = useRouter()

	const { mutate, isLoading, isError, isSuccess, error } = useMutation((userData: Auth) => {
		if (Object.keys(userData).length === 1) {
			return AuthService.getResetPasswordMail(userData as ForgotPassword)
		}
		if ('resetToken' in userData) {
			return AuthService.resetPassword(userData)
		}
		if ('username' in userData) {
			return AuthService.register(userData)
		}
		return AuthService.login(userData as Login)
	})

	useEffect(() => {
		if (isSuccess) {
			router.push('/')
		}
	}, [isSuccess])

	const onSubmit = (values: Auth) => {
		mutate(values)
	}

	return { onSubmit, isLoading, isError, error }
}
