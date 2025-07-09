import getCurrentUser from '../users/apiGetUser.js'
import checkRecord from '../database/operations/checkRecord.js'
import insertTable from '../database/operations/insertTable.js'
import getRecord from '../database/operations/getRecord.js'
import apiGetUserId from '../users/apiGetUserId.js'
import updateRecord from '../database/operations/updateRecord.js'

async function joinTeamApi(teamCode) {
  const { isFound: teamFound, data: teamData } = await checkRecord(
    'teams_table',
    'team_code',
    teamCode
  )
  const teamId = teamData?.id
  const currentUser = (await getCurrentUser())?.id
  const { isFound: playerAlreadyJoined, data: playersDat } = await checkRecord(
    'players_table',
    'user_id',
    currentUser
  )

  if (teamFound) {
    const { data: playersData } = await getRecord(
      'players_table',
      'team_id',
      teamId
    )
    if (playersData.length >= 5) throw new Error('JoinTeam is full')
    if (playerAlreadyJoined) {
      const { data, error } = await updateRecord(
        'players_table',
        'user_id',
        currentUser,
        { team_id: teamId }
      )
      return { data, error, teamCode }
    } else {
      const { data, error } = insertTable('players_table', {
        team_id: teamId,
        user_id: currentUser,
      })
      return { data, error, teamCode }
    }
  }
  if (!teamFound) throw new Error('JoinTeam not found')
  if (playerAlreadyJoined) throw new Error('You have already joined this team')
}
export { joinTeamApi }
