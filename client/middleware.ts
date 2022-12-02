import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headerType } from './services/config'
import AuthService from './services/api/Auth'
import { Tokens } from './models/auth'

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(headerType.ACCESS_TOKEN)?.value as string | undefined
	const refreshToken = request.cookies.get(headerType.REFRESH_TOKEN)?.value as string | undefined
	const isTokenValid: boolean = await AuthService.check(accessToken)
	const pathname = request.nextUrl.pathname

	if (pathname === '/auth' && isTokenValid) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (pathname !== '/auth' && isTokenValid) {
		return NextResponse.next()
	}

	const tokens: Tokens = await AuthService.refresh(refreshToken)

	if (pathname === '/auth' && !tokens.accessToken) {
		return NextResponse.next()
	}

	if (!tokens.accessToken) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	const response = NextResponse.redirect(request.url)
	response.cookies.set(headerType.ACCESS_TOKEN, tokens.accessToken)
	response.cookies.set(headerType.REFRESH_TOKEN, tokens.refreshToken)

	return response
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|favicon.ico).*)',
	],
}
