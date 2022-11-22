const User = require('../../models/User')
const ErrorResponse = require('../../utils/errorResponse')
const uuid = require('uuid')
const mailService = require('./services/mail.service')
const tokenService = require('./services/token.service')
const UserDto = require('../../dtos/user.dto')

const register = async (req, res, next) => {
	const { username, email, password } = req.body

	try {
		const candidate = await User.findOne({ email })

		if (candidate) {
			return next(new ErrorResponse("User with this email already exists", 401))
		}

		const activationLink = uuid.v4()
		const user = await User.create({
			username,
			email,
			password,
			activationLink
		})

		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })

		return res.status(201).json({
			...tokens,
			user: userDto
			})
	} catch(error) {
		next(error)
	}
}

const activate = async (req, res, next) => {
	try {
		const activationLink = req.params.link
		const user = await User.findOne({ activationLink })

		if (!user) {
			return next(new ErrorResponse("Activation link is invalid", 401))
		}
		user.isActivated = true
		await user.save()

		return res.redirect('http://ya.ru')
	} catch(error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponse("Please provide email and password", 400))
	}

	try {
		const user = await User.findOne({ email }).select("+password")

		if (!user) {
			return next(new ErrorResponse("Invalid credentials", 401))
		}

		const isMatch = await user.matchPassword(password)

		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401))
		}
	} catch(error) {
		next(error)
	}
}

const logout = (req, res, next) => {
	res.send("Forgot password route")
}

const refresh = (req, res, next) => {
	res.send("Reset password route")
}

const forgotPassword = (req, res, next) => {
	res.send("Forgot password route")
}

const resetPassword = (req, res, next) => {
	res.send("Reset password route")
}

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
	logout,
	activate,
	refresh
}