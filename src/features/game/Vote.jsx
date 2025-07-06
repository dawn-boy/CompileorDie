import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementCycle,
  setChosenOne,
  setRound,
} from '../../redux/userSlice.js'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'
import { useCallback, useEffect, useState } from 'react'
import updateRecord from '../../services/database/operations/updateRecord.js'
import getTeamNames from '../../helpers/getTeamNames.js'

const Vote = () => {
  const navigate = useNavigate()
  const role = useSelector(state => state.user.role)
  const playerId = useSelector(state => state.user.playerId)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState({ choice: null })
  const [confirm, setConfirm] = useState('')
  const teamData = useSelector(state => state.user.team)
  const currentUserData = useSelector(state => state.user.userProfileData)
  const handleNext = useCallback(() => {
    dispatch(setChosenOne(selected))
    dispatch(setRound(1))
    dispatch(incrementCycle())
    navigate('/gameplay', { replace: true, state: { role } })
  }, [selected, dispatch, navigate, role])

  useEffect(() => {
    if (confirm === 'clicked') {
      if (!selected.choice) setConfirm('error')
      else {
        updateRecord('rounds_report', 'player_id', playerId, {
          voted: selected.choice,
        })
        handleNext()
      }
    }
  }, [confirm, handleNext])
  function handleSubmit(resp) {
    setSelected(resp)
  }
  const team = getTeamNames(teamData, currentUserData)

  return (
    <div>
      <h1>This is the voting page.</h1>
      <FormProvider {...useForm()}>
        <Form onSubmit={handleSubmit}>
          {team.map(player => (
            <Form.SelectOptions
              key={player.id}
              value={player.id}
              label={player.name}
              normalText="Vote"
              onActiveText="Voted"
            />
          ))}
          <button onClick={() => setConfirm('clicked')}>Next</button>
          {confirm === 'error' && selected.choice === null && (
            <h3>Please select a player</h3>
          )}
        </Form>
      </FormProvider>
    </div>
  )
}

export default Vote
