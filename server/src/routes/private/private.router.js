const express = require('express')
const router = express.Router()
const { getPrivateData } = require('../private/private.controller')
const protect = require('../../middleware/auth')

router.get('/', protect, getPrivateData)

module.exports = router