const User = require('../../models/User')
const ErrorResponse = require('../../utils/errorResponse')
const uuid = require('uuid')
const mailService = require('./services/mail.service')
const generateAndSaveTokens = require('../../utils/generateAndSaveTokens')
const Token = require('../../models/Token')
const jwt = require('jsonwebtoken')

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

		return generateAndSaveTokens(user, res)
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

		return generateAndSaveTokens(user, res)
	} catch(error) {
		next(error)
	}
}

const logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies

		await Token.deleteOne({ refreshToken })
		res.clearCookie('refreshToken')

		return res.status(200).json({
			ok: true
		})
	} catch(error) {
		next(error)
	}
}

const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies

		if (!refreshToken) {
			return next(new ErrorResponse("Unauthorized", 401))
		}

		const userData  = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		const tokenFromDb = await Token.findOne({ refreshToken })

		if (!userData || !tokenFromDb) {
			return next(new ErrorResponse("Unauthorized", 401))
		}

		res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

		const user = await User.findById(userData.id)

		return generateAndSaveTokens(user, res)
	} catch(error) {
		next(error)
	}
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