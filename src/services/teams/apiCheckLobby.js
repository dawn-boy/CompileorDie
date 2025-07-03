import checkRecord from '../database/operations/checkRecord.js'
import apiGetUser from '../users/apiGetUser.js'

async function apiCheckLobby() {
  const currentUserId = (await apiGetUser())?.id
  const { isFound } = await checkRecord(
    'players_table',
    'user_id',
    currentUserId
  )
  return isFound
}

export default apiCheckLobby
