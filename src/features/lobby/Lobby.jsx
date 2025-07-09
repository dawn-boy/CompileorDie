import Loading from '../../ui/Loading.jsx'
import UserGrid from './UserGrid.jsx'
import { useDispatch, useSelector } from 'react-redux'
import useTeamViewRealtime from '../../hooks/database/useTeamViewRealtime.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGameStateReset from '../../hooks/gameplay/useGameStateReset.js'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'
import { setTeamInfo } from '../../redux/userSlice.js'
import updateRecord from '../../services/database/operations/updateRecord.js'
import getRecord from '../../services/database/operations/getRecord.js'

const Lobby = () => {
  const teamCode = useSelector(state => state.user.teamCode)
  const dispatch = useDispatch()
  const [allReady, setAllReady] = useState(false)
  const navigate = useNavigate()
  const [team, setTeam] = useState({})
  useGameStateReset()

  useEffect(() => {
    async function getTeam() {
      const { isFound, data } = await apiFetchTeam(teamCode)
      dispatch(setTeamInfo(data))
      setTeam(data)
    }
    getTeam()
  }, [])

  const { teamData, isLoading, error } = useTeamViewRealtime(
    teamCode,
    setAllReady
  )

  useEffect(() => {
    if (allReady) {
      updateRecord('teams_table', 'team_code', teamCode, {
        team_status: 'in-game',
      })
      navigate('/countdown', { replace: true, state: { teamCode } })
    } else {
    }
  }, [allReady, navigate, teamCode])

  if (error) return <div>{error}</div>
  if (!teamCode) {
    return <div>Enter a valid team code, Woody!</div>
  }
  if (isLoading || !teamData) return <Loading />
  if (teamData)
    return (
      <div>
        {error && <div>Team not Found</div>}
        <div>
          {teamData && (
            <UserGrid
              userData={teamData}
              teamCode={teamCode}
              admin={team?.created_by_user_id}
            />
          )}
        </div>
      </div>
    )
}

export default Lobby
