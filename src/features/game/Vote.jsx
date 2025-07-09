import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementCycle,
  setChosenOne,
  setRound,
} from '../../redux/userSlice.js'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'
import { useCallback, useState } from 'react'
import getTeamNames from '../../helpers/getTeamNames.js'
import useReport from '../../hooks/gameplay/useReport.js'

const Vote = () => {
  const navigate = useNavigate()
  const role = useSelector(state => state.user.role)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState({ choice: null })
  const [confirm, setConfirm] = useState('')
  const teamData = useSelector(state => state.user.team)
  const currentUserData = useSelector(state => state.user.userProfileData)
  const alreadyEliminatedPlayers = useSelector(
    state => state.user.eliminatedPlayers
  )
  const handleNext = useCallback(() => {
    dispatch(setChosenOne({ choice: null }))
    dispatch(setRound(1))
    dispatch(incrementCycle())
    navigate('/waiting', { replace: true, state: { fromVotingPage: true } })
  }, [selected, dispatch, navigate, role])

  function handleSubmit(resp) {
    setSelected(resp)
  }
  const team = getTeamNames(teamData, currentUserData)

  useReport(confirm, setConfirm, selected, handleNext, {
    voted: selected.choice,
    isCompilable: true,
    haveVoted: true,
  })

  const updatedTeam = team.filter(
    player => !alreadyEliminatedPlayers.includes(player.name.toLowerCase())
  )

  return (
    <div>
      <h1>This is the voting page.</h1>
      <FormProvider {...useForm()}>
        <Form onSubmit={handleSubmit}>
          {updatedTeam.map(player => (
            <Form.SelectOptions
              key={player.id}
              value={player.id}
              label={player.name}
              normalText="Vote"
              onActiveText="Voted"
            />
          ))}
          <Form.SelectOptions
            key={1}
            value={'null'}
            label={'Skip Vote'}
            normalText="skip"
            onActiveText="skipped"
          />
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
