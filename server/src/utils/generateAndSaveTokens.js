const UserDto = require("../dtos/user.dto");
const tokenService = require("../routes/auth/services/token.service");

module.exports = async (user, res) => {
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return res.status(201).json({
    ...tokens,
    user: userDto,
  });
};
