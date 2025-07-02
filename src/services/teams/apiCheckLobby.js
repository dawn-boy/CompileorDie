import checkRecord from '../database/operations/checkRecord.js'
import apiGetCurrentUser from '../users/apiGetCurrentUser.js'

async function apiCheckLobby() {
  const currentUserId = (await apiGetCurrentUser())?.id
  const { isFound } = await checkRecord(
    'players_table',
    'user_id',
    currentUserId
  )
  return isFound
}

export default apiCheckLobby
