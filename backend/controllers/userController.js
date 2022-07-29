const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const user = require('../models/userModel')


// @desc    Register Users
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    res.json({ message: 'Register User' })
}

// @desc    Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    res.json({ message: 'Login User' })
}

// @desc    Get a user data
// @route   POST /api/user/me
// @access  Private
const getMe = async (req, res) => {
    res.json({ message: 'User data display' })
}

module.exports = { registerUser, loginUser, getMe }