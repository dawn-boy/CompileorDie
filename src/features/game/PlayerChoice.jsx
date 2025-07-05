import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChosenOne } from '../../redux/userSlice.js'

const PlayerChoice = () => {
  const navigate = useNavigate()
  const role = useSelector(state => state.user.role)
  const dispatch = useDispatch()

  function handleNext() {
    dispatch(setChosenOne(role))
    navigate('/gameplay', { replace: true, state: { role } })
  }

  return (
    <div>
      <h1>This is the PlayerChoice page.</h1>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default PlayerChoice
