import apiSupabase from '../database/apiSupabase.js'

async function apiLogin({ email, password }) {
  let { data, error } = await apiSupabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(`Error signing in: ${error.message}`)
  return data
}

export default apiLogin
