import apiUpdateUserPresence from '../users/apiUpdateUserPresence.js'
import apiSupabase from '../database/apiSupabase.js'

async function apiLogout() {
  await apiUpdateUserPresence('offline')
  const { error } = await apiSupabase.auth.signOut()
  if (error) throw new Error(`Error signing out: ${error.message}`)
}

export default apiLogout
