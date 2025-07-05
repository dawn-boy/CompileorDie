import getRecord from '../database/operations/getRecord.js'
import apiGetUserId from './apiGetUserId.js'

async function apiGetPlayerId() {
  const id = await apiGetUserId()
  const player = await getRecord('players_table', 'user_id', id)
  return player?.data[0]?.id
}

export default apiGetPlayerId
