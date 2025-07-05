import updateRecord from '../database/operations/updateRecord.js'
import apiGetUserId from '../users/apiGetUserId.js'

async function apiResetPlayersStatus(teamCode) {
  const user_id = await apiGetUserId()
  const { data, error } = await updateRecord(
    'players_table',
    'user_id',
    user_id,
    {
      status: 'not-ready',
    }
  )
}

export default apiResetPlayersStatus
