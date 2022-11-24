export type Login = {
	email: string
	password: string
}

export type User = {
	accessToken: string
	refreshToken: string
	user: {
		email: string
		id: string
		isActivated: boolean
	}
}
