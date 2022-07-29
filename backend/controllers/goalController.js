const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private

const getGoals = async (req, res) => {
    const goal = await Goal.find({ user: req.user.id })
    res.status(200).json(goal)
}

// @desc    Set Goals
// @route   POST /api/goals
// @access  Private

const postGoal = async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
}

// @desc    Update Goals
// @route   PUT /api/goals
// @access  Private

const updateGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        req.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goals user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedGoal)
}

// @desc    Delete Goals
// @route   DEL /api/goals
// @access  Private

const deleteGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        req.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goals user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id, message: 'Data successfully deleted' })
}

module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
}