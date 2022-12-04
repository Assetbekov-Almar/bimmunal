const URL = 'http://localhost:3000'
const ROUTE = '/api/auth'

export const authConfig = {
	LOGIN: `${URL}${ROUTE}/login`,
	REGISTER: `${URL}${ROUTE}/register`,
	CHECK: `${URL}${ROUTE}/check`,
	REFRESH: `${URL}${ROUTE}/refresh`,
}
