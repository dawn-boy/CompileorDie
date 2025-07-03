import updateRecord from '../database/operations/updateRecord.js'
import apiGetUser from './apiGetUser.js'

async function apiUpdateUserPresence(action) {
  const user = await apiGetUser()
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
      const { error: statusError } = await updateRecord(
        'players_table',
        'user_id',
        user.id,
        { status: 'not-ready' }
      )
      if (statusError) throw new Error(statusError.message)
      break
    default:
      return
  }
}

export default apiUpdateUserPresence
