import apiGetLoggedInUser from '../users/apiGetLoggedInUser.js'
import updateRecord from '../database/operations/updateRecord.js'
import checkRecord from '../database/operations/checkRecord.js'

async function apiTogglePlayerStatus() {
  const userId = (await apiGetLoggedInUser())?.id
  const playerData = await checkRecord('players_table', 'user_id', userId)
  if (playerData.isFound) {
    let status = playerData.data.status === 'ready' ? 'not-ready' : 'ready'

    const { data, error } = await updateRecord(
      'players_table',
      'user_id',
      userId,
      {
        status: status,
      }
    )
    if (error) throw new Error(`Error updating player status: ${error.message}`)
    return data
  } else throw new Error('Player not found in the team')
}

export default apiTogglePlayerStatus
