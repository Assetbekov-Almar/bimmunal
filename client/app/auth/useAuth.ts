import { useMutation } from '@tanstack/react-query'
import { ForgotPassword, Login, Register } from '../../models/auth'
import AuthService from '../../services/api/Auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = () => {
	const { mutate, isLoading, isError, isSuccess, error } = useMutation(
		(userData: Login | Register | ForgotPassword) => {
			if (Object.keys(userData).length === 1) {
				return AuthService.getResetPasswordMail(userData as ForgotPassword)
			}
			if ('username' in userData) {
				return AuthService.register(userData)
			}
			return AuthService.login(userData as Login)
		}
	)

	const router = useRouter()

	useEffect(() => {
		if (isSuccess) {
			router.push('/')
		}
	}, [isSuccess])

	const onSubmit = (values: Login | Register | ForgotPassword) => {
		mutate(values)
	}

	return { onSubmit, isLoading, isError, error }
}
