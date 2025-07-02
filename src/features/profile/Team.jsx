import Form from '../../forms/Form.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { useTeamJoin } from '../../hooks/database/useTeamJoin.js'
import { useDispatch } from 'react-redux'
import { setLobby } from '../../redux/userSlice.js'

const Team = () => {
  const { joinTeam } = useTeamJoin()
  const dispatch = useDispatch()

  function onSubmit(resp) {
    const { 'team-code': teamCode } = resp
    joinTeam({ teamCode })
    dispatch(setLobby(true))
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

export default Team
