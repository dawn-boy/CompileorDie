import Form from '../../forms/Form.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { useTeamJoin } from '../../hooks/database/useTeamJoin.js'
import { useDispatch } from 'react-redux'
import { setLobby } from '../../redux/userSlice.js'
import { useEffect, useState } from 'react'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'
import toast from 'react-hot-toast'

const JoinTeam = () => {
  const { joinTeam } = useTeamJoin()
  const dispatch = useDispatch()

  async function onSubmit(resp) {
    const { 'team-code': teamCode } = resp
    if (teamCode) {
      const { data } = await apiFetchTeam(teamCode)
      if (!data) toast.error("Team doesn't exist!")
      if (data) {
        const teamStatus = data?.team_status

        if (teamStatus === 'waiting' || teamStatus === 'finished') {
          joinTeam({ teamCode })
          dispatch(setLobby(true))
        }
        if (teamStatus === 'in-game') {
          toast.error('The Game has already Begun!')
        }
      }
    }
  }
  return (
    <div>
      <div>
        <h1>Join a Team</h1>
        <FormProvider {...useForm()}>
          <Form onSubmit={onSubmit}>
            <Form.TextBox name="Team Code" />
            <Form.Submit label="Join" />
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}

export default JoinTeam
