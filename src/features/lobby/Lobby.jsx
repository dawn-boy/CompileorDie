import Loading from '../../ui/Loading.jsx'
import UserGrid from './UserGrid.jsx'
import { useSelector } from 'react-redux'
import useTeamViewRealtime from '../../hooks/database/useTeamViewRealtime.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const teamCode = useSelector(state => state.user.teamCode)
  const [allReady, setAllReady] = useState(false)
  const navigate = useNavigate()
  const { teamData, isLoading, error } = useTeamViewRealtime(
    teamCode,
    setAllReady
  )

  if (allReady) {
    navigate('/countdown', { replace: true, state: { teamCode } })
  }

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
          {teamData && <UserGrid userData={teamData} teamCode={teamCode} />}
        </div>
      </div>
    )
}

export default Lobby
