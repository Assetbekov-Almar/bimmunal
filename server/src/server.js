require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', require('./controllers/auth/auth.router'))

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
	console.log('Listening on port ' + PORT)
})

process.on('unhandledRejection', (err) => {
	console.log("unhandledRejection error: " + err)
	server.close(() => process.exit(1))
})

