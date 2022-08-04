import { deleteGoal, getGoals } from '../features/goals/goalSlice'
import { useDispatch } from 'react-redux'

function GoalItem({ goal }) {
    const dispatch = useDispatch()

    return (
        <div className="goal" key={goal._id}>
            <div>
                {new Date(goal.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{goal.text}</h2>
            <button onClick={() => {
                dispatch(deleteGoal(goal._id))
                dispatch(getGoals())
            }} className="close">X</button>
        </div>
    )
}

export default GoalItem