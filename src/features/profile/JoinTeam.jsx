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
  const [code, setCode] = useState('')
  const [teamData, setTeamData] = useState([])

  useEffect(() => {
    async function getTeamData() {
      if (code) {
        const { isFound, data } = await apiFetchTeam(code)
        console.log(data, isFound)
        if (isFound) setTeamData(data)
      }
    }
    getTeamData()
  }, [code])

  function onSubmit(resp) {
    const { 'team-code': teamCode } = resp
    setCode(teamCode)

    const teamStatus = teamData?.team_status
    console.log(teamData)

    if (teamStatus === 'waiting' || teamStatus === 'finished') {
      setCode(teamCode)
      joinTeam({ teamCode })
      dispatch(setLobby(true))
    }
    if (teamStatus === 'in-game') {
      toast.error('The Game has already Begun!')
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
