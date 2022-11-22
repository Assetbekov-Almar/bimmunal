const User = require('../../models/User')
const ErrorResponse = require('../../utils/errorResponse')

const register = async (req, res, next) => {
	const { username, email, password } = req.body

	try {
		const user = await User.create({
			username,
			email,
			password
		})

		sendToken(user, 201, res)
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

		sendToken(user, 200, res)
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
	resetPassword
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()
	res.status(statusCode).json({
		success: true,
		token
	})
}