import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChosenOne } from '../../redux/userSlice.js'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'
import { useEffect, useState } from 'react'
import updateRecord from '../../services/database/operations/updateRecord.js'
import getTeamNames from '../../helpers/getTeamNames.js'

const PlayerChoice = () => {
  const navigate = useNavigate()
  const role = useSelector(state => state.user.role)
  const playerId = useSelector(state => state.user.playerId)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState({ choice: null })
  const [confirm, setConfirm] = useState('')
  const teamData = useSelector(state => state.user.team)
  const currentUserData = useSelector(state => state.user.userProfileData)

  useEffect(() => {
    if (confirm === 'clicked') {
      if (!selected.choice) setConfirm('error')
      else {
        updateRecord('rounds_report', 'player_id', playerId, {
          chosen_one: selected.choice,
        })
        handleNext()
      }
    }
  }, [confirm, handleNext])
  function handleSubmit(resp) {
    setSelected(resp)
  }
  function handleNext() {
    dispatch(setChosenOne(selected))
    navigate('/gameplay', { replace: true, state: { role } })
  }
  const team = getTeamNames(teamData, currentUserData)

  return (
    <div>
      <h1>This is the PlayerChoice page.</h1>
      <FormProvider {...useForm()}>
        <Form onSubmit={handleSubmit}>
          {team.map(player => (
            <Form.SelectOptions
              label={player.name}
              key={player.id}
              value={player.id}
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

export default PlayerChoice
