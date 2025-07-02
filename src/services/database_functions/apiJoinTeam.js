import { checkRecord, insertTable } from '../apiDatabaseOps.js'
import { getCurrentUser } from '../apiAuth.js'

async function apiJoinTeam(teamCode) {
  const { isFound: teamFound, data: teamData } = await checkRecord(
    'teams_table',
    'team_code',
    teamCode
  )
  const teamId = teamData?.id
  const currentUser = (await getCurrentUser())?.id
  const { isFound: playerAlreadyJoined } = await checkRecord(
    'players_table',
    'user_id',
    currentUser
  )

  if (teamFound && !playerAlreadyJoined) {
    const { data, error } = insertTable('players_table', {
      team_id: teamId,
      user_id: currentUser,
    })
    return { data, error }
  }
  if (!teamFound) throw new Error('Team not found')
  if (playerAlreadyJoined) throw new Error('You have already joined this team')
}
export { apiJoinTeam }
