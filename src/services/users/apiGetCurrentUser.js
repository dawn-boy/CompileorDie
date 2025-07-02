import apiSupabase from '../database/apiSupabase.js'

async function apiGetCurrentUser() {
  const { data: user, error } = await apiSupabase.auth.getUser()
  if (error) throw new Error(`Error getting user: ${error.message}`)
  return user?.user
}

export default apiGetCurrentUser
