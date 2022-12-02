export const requestType = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
}

export const headerType = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
}

export const statusCodes = {
	ok: 200,
	accepted: 202,
	badRequest: 400,
	unauthorized: 401,
	conflict: 409,
	unprocessableEntity: 422,
	serverError: 500,
}
