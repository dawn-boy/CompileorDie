import Form from '../../forms/Form.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { useTeamJoin } from '../../hooks/database/useTeamJoin.js'
import { useDispatch } from 'react-redux'
import { setLobby } from '../../redux/userSlice.js'
import { useEffect, useState } from 'react'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'
import toast from 'react-hot-toast'
import ApiSupabase from '../../services/database/apiSupabase.js'
import apiTeamCheck from '../../services/teams/apiTeamCheck.js'
import insertTable from '../../services/database/operations/insertTable.js'
import apiTeamCreate from '../../services/teams/apiTeamCreate.js'

const CreateTeam = () => {
  const { joinTeam } = useTeamJoin()
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const [teamData, setTeamData] = useState([])

  useEffect(() => {
    async function getTeamData() {
      if (code) {
        const { isFound, data } = await apiFetchTeam(code)
        if (isFound) setTeamData(data)
      }
    }
    getTeamData()
  }, [code])

  async function onSubmit(resp) {
    const { 'team-name': teamName, 'team-code': teamCode } = resp

    const teamFound = await apiTeamCheck(teamCode, teamName)
    if (teamFound) {
      toast.error("A Team's legacy already exists!")
    } else {
      await apiTeamCreate(teamName, teamCode)
      joinTeam({ teamCode })
      dispatch(setLobby(true))
    }
  }
  return (
    <div>
      <div>
        <h1>Create a Team</h1>
        <FormProvider {...useForm()}>
          <Form onSubmit={onSubmit}>
            <Form.TextBox name="Team Name" />
            <Form.TextBox name="Team Code" />
            <Form.Submit label="Create" />
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CreateTeam
