import apiGetLoggedInUser from './apiGetLoggedInUser.js'
import checkRecord from '../database/operations/checkRecord.js'

async function apiGetCurrentRole() {
  const user = (await apiGetLoggedInUser()) ?? null
  if (!user) throw new Error('User not logged in')
  const userId = user?.id
  if (!userId) throw new Error('UserId retrieval failed')

  const { isFound: userFound, data: userData } = await checkRecord(
    'players_table',
    'user_id',
    userId
  )
  if (!userFound) throw new Error('User not found in the team')

  return userData?.role
}

export default apiGetCurrentRole
