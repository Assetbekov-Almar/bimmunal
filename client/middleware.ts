import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headerType } from './services/config'
import AuthService from './services/api/Auth'

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(headerType.ACCESS_TOKEN)?.value as string | undefined
	const isTokenValid: boolean = await AuthService.check(accessToken)
	const pathname = request.nextUrl.pathname

	if (pathname === '/auth' && !isTokenValid) {
		return NextResponse.next()
	}

	if (pathname === '/auth' && isTokenValid) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!isTokenValid) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}
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
