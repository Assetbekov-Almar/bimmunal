import { useMutation } from '@tanstack/react-query'
import { Login, Register } from '../../models/auth'
import AuthService from '../../services/api/Auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = () => {
	const { mutate, isLoading, isError, isSuccess, error } = useMutation((userData: Login | Register) => {
		if ('username' in userData) {
			return AuthService.register(userData)
		}
		return AuthService.login(userData)
	})

	const router = useRouter()

	useEffect(() => {
		if (isSuccess) {
			router.push('/')
		}
	}, [isSuccess])

	const onSubmit = (values: Login) => {
		mutate(values)
	}

	return { onSubmit, isLoading, isError, error }
}
