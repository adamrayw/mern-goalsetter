const { Router } = require('express');
const express = require('express');
const { registerUser } = require('../controllers/userController')

const router = express.Router()

Router.post('/', registerUser)

module.exports = router