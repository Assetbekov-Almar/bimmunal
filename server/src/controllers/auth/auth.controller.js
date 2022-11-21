const register = (req, res, next) => {
	res.send("register route")
}

const login = (req, res, next) => {
	res.send("Login route")
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