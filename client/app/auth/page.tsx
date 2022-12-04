'use client'

import { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { headerType } from '../../services/config'

const Auth = () => {
	const [isLoginPage, setIsLoginPage] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (getCookie(headerType.ACCESS_TOKEN)) {
			router.push('/')
		}
	}, [])

	return isLoginPage ? <Login setIsLoginPage={setIsLoginPage} /> : <Register setIsLoginPage={setIsLoginPage} />
}

export default Auth
