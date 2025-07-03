import apiSupabase from '../database/apiSupabase.js'

async function apiGetLoggedInUser() {
  const { data } = await apiSupabase.auth.getSession()
  return data?.session?.user
}

export default apiGetLoggedInUser
