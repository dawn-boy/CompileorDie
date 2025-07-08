import { useDispatch, useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'
import { useState } from 'react'
import getTeamNames from '../../helpers/getTeamNames.js'
import useReport from '../../hooks/gameplay/useReport.js'
import { useNavigate } from 'react-router-dom'
import { setChosenOne } from '../../redux/userSlice.js'

const PlayerChoice = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selected, setSelected] = useState({ choice: null })
  const [confirm, setConfirm] = useState('')
  const teamData = useSelector(state => state.user.team)
  const role = useSelector(state => state.user.role)
  const currentUserData = useSelector(state => state.user.userProfileData)
  const team = getTeamNames(teamData, currentUserData)
  const alreadyEliminatedPlayers = useSelector(
    state => state.user.eliminatedPlayers
  )

  function handleNext() {
    dispatch(setChosenOne(selected))
    if (role === 'cyberguardian')
      navigate('/sussy', { replace: true, state: { selected, teamData } })
    else navigate('/gameplay', { replace: true, state: { role } })
  }

  function handleSubmit(resp) {
    setSelected(resp)
  }

  useReport(confirm, setConfirm, selected, handleNext, {
    chosen_one: selected.choice,
  })

  const updatedTeam = team.filter(
    player => !alreadyEliminatedPlayers.includes(player.name.toLowerCase())
  )

  return (
    <div>
      <h1>This is the PlayerChoice page.</h1>
      <FormProvider {...useForm()}>
        <Form onSubmit={handleSubmit}>
          {updatedTeam.map(player => (
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
