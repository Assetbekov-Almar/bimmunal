export const validateMatchPasswords = (pass: string, value: string) => {
	let error = ''
	if (pass && value && pass !== value) {
		error = 'Пароли не совпадают'
	}
	return error
}
