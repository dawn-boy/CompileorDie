import apiSupabase from '../database/apiSupabase.js'

async function apiGetUser() {
  const { data } = await apiSupabase.auth.getUser()
  return data?.user
}
export default apiGetUser
