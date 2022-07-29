// @desc    Register Users
// @route   POST /api/users/register
// @access  Public
const registerUser = (req, res) => {
    res.json({ message: 'Register User' })
}

// @desc    Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
    res.json({ message: 'Login User' })
}

// @desc    Get a user data
// @route   POST /api/user/me
// @access  Private
const getMe = (req, res) => {
    res.json({ message: 'User data display' })
}

module.exports = { registerUser, loginUser, getMe }