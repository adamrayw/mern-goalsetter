const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/userModel')


// @desc    Register Users
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exist
    const checkUser = await User.findOne({ email })

    if (checkUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
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