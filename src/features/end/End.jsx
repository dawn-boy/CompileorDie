import { useEffect, useState } from 'react'
import getRecord from '../../services/database/operations/getRecord.js'
import { useDispatch, useSelector } from 'react-redux'
import ApiSupabase from '../../services/database/apiSupabase.js'
import Capitalize from '../../helpers/capitalize.js'
import capitalize from '../../helpers/capitalize.js'
import updateRecord from '../../services/database/operations/updateRecord.js'
import { setPreviousResults } from '../../redux/userSlice.js'

const End = ({ message }) => {
  const [players, setPlayers] = useState(null)
  const teamCode = useSelector(state => state.user.teamCode)
  const teamInfo = useSelector(state => state.user.teamInfo)
  const previousResults = useSelector(state => state.user.previousResults)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getPlayers() {
      if (!previousResults) {
        const data = await ApiSupabase.from('players_table')
          .select('role, users_table(name)')
          .eq('team_id', teamInfo.id)
        const playersData = data?.data.map(player => ({
          role: player.role,
          name: player.users_table.name,
        }))
        setPlayers(playersData)
        dispatch(setPreviousResults(playersData))
        const { data: teamsData, error } = await ApiSupabase.from(
          'players_table'
        )
          .update({ role: null })
          .eq('team_id', teamInfo?.id)
      } else {
        setPlayers(previousResults)
      }
    }
    getPlayers()
  }, [])

  return (
    <div>
      <h1>Thanks for playing my game. Parzival.</h1>
      <h2>{message}</h2>
      <h3>Players:</h3>
      {players &&
        players.map(player => (
          <h4>
            {capitalize(player.name)} => <span>{capitalize(player.role)}</span>
          </h4>
        ))}
    </div>
  )
}

export default End
