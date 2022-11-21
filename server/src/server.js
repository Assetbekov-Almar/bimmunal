const express = require('express')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/auth', require('./controllers/auth/auth.router'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT)
})