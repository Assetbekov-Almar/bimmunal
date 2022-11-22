const UserDto = require("../dtos/user.dto")
const tokenService = require("../routes/auth/services/token.service")

module.exports = async (user, res) => {
	const userDto = new UserDto(user)
	const tokens = tokenService.generateTokens({ ...userDto })
	await tokenService.saveToken(userDto.id, tokens.refreshToken)

	//TODO: Add secure: true for prod
	res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

	return res.status(201).json({
		...tokens,
		user: userDto
	})
}