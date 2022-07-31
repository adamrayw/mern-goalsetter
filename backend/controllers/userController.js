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
        res.json({ message: 'Please add a all fields' })
    }

    // check if user exist
    const checkUser = await User.findOne({ email })

    if (checkUser) {
        res.status(400)
        res.json({ message: 'User already exist' })
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
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        res.json({ message: 'invalid user data' })
    }


    res.json({ message: 'Register User' })
}

// @desc    Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        res.json({ message: 'invalid credentials' })
    }
}

// @desc    Get a user data
// @route   POST /api/user/me
// @access  Private
const getMe = async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { registerUser, loginUser, getMe }