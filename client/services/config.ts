export const requestType = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
}

export const headerType = {
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
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
