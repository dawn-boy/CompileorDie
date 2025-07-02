import updateRecord from '../database/operations/updateRecord.js'
import apiGetCurrentUser from './apiGetCurrentUser.js'

async function apiUpdateUserPresence(action) {
  const user = await apiGetCurrentUser()
  if (!user) throw new Error('User not logged in')
  switch (action) {
    case 'online':
      const { error: loginError } = await updateRecord(
        'users_table',
        'id',
        user.id,
        {
          status: 'online',
          last_seen: new Date(),
        }
      )
      if (loginError) throw new Error(loginError.message)
      break

    case 'offline':
      const { error: logoutError } = await updateRecord(
        'users_table',
        'id',
        user.id,
        {
          status: 'offline',
          last_seen: new Date(),
        }
      )
      if (logoutError) throw new Error(logoutError.message)
      break
    default:
      return
  }
}

export default apiUpdateUserPresence
