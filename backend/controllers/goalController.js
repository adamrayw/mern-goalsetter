const Goal = require('../models/goalModel')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private

const getGoals = async (req, res) => {
    const goal = await Goal.find()
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
        text: req.body.text
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

    await goal.remove()

    res.status(200).json({ id: req.params.id, message: 'Data successfully deleted' })
}

module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
}