export type Login = {
	email: string
	password: string
}

export type UserInfo = {
	email: string
	id: string
	isActivated: boolean
}

export type Tokens = {
	accessToken: string
	refreshToken: string
}

export type User = Tokens & {
	user: UserInfo
}

export type Register = Login & {
	username: string
	repeatPassword: string
}

export type ForgotPassword = Omit<Login, 'password'>

export type ResetPassword = Login & {
	repeatPassword: string
}
