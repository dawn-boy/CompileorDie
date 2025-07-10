import getCurrentUser from '../users/apiGetUser.js'
import checkRecord from '../database/operations/checkRecord.js'
import insertTable from '../database/operations/insertTable.js'
import getRecord from '../database/operations/getRecord.js'
import apiGetUserId from '../users/apiGetUserId.js'
import updateRecord from '../database/operations/updateRecord.js'

async function joinTeamApi(teamCode) {
  // checking if there's a team available
  const { data: teamData } = await checkRecord(
    'teams_table',
    'team_code',
    teamCode
  )

  const currentUser = (await getCurrentUser())?.id
  const { isFound: playerFoundInATeam, data: playersDat } = await checkRecord(
    'players_table',
    'user_id',
    currentUser
  )
  const teamId = teamData?.id

  // getting all the teamPlayers
  const { data: playersData } = await getRecord(
    'players_table',
    'team_id',
    teamId
  )

  // checking if the player is found within the team
  const playerAlreadyJoined = playersData.find(
    player => player.user_id === currentUser
  )

  if (playerAlreadyJoined) throw new Error('You have already joined this team')
  // if the player is not found within the team
  if (!playerAlreadyJoined) {
    // if the team isn't full yet
    if (playersData.length >= 5) throw new Error('Team is full')

    // if player is present in another team
    if (playerFoundInATeam) {
      const { data, error } = await updateRecord(
        'players_table',
        'user_id',
        currentUser,
        { team_id: teamId }
      )
      return { data, error, teamCode }
    }
    // if player haven't event joined any teams
    else {
      const { data, error } = await insertTable('players_table', {
        team_id: teamId,
        user_id: currentUser,
      })
      return { data, error, teamCode }
    }
  }
}
export { joinTeamApi }
