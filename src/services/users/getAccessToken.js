import apiSupabase from '../database/apiSupabase.js'

async function getAccessToken() {
  const { data } = await apiSupabase.auth.getSession()
  return data.session.access_token
}

export default getAccessToken
