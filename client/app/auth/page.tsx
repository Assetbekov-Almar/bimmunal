'use client'

import { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { headerType } from '../../services/config'
import { FORGOT_PASSWORD, LOGIN, REGISTER, RESET_PASSWORD } from './constants'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const Auth = () => {
	const [currentPage, setCurrentPage] = useState(LOGIN)

	const router = useRouter()

	useEffect(() => {
		if (getCookie(headerType.ACCESS_TOKEN)) {
			router.push('/')
		}
	}, [])

	switch (currentPage) {
		case LOGIN:
			return <Login setCurrentPage={setCurrentPage} />
		case REGISTER:
			return <Register setCurrentPage={setCurrentPage} />
		case FORGOT_PASSWORD:
			return <ForgotPassword />
		case RESET_PASSWORD:
			return <ResetPassword setCurrentPage={setCurrentPage} />
		default:
			return <Login setCurrentPage={setCurrentPage} />
	}
}

export default Auth
