export type Login = {
	email: string
	password: string
}

export type UserInfo = {
	email: string
	id: string
	isActivated: boolean
}

export type User = {
	accessToken: string
	refreshToken: string
	user: UserInfo
}
