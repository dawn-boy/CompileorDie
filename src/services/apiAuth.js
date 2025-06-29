import apiSupabase from './apiSupabase.js'

async function loginApi({ email, password }) {
  let { data, error } = await apiSupabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(`Error signing in: ${error.message}`)
  return data
}
async function logoutApi() {
  const { error } = await apiSupabase.auth.signOut()
  if (error) throw new Error(`Error signing out: ${error.message}`)
}
async function registerApi({ email, password }) {
  const { data, error } = await apiSupabase.auth.signUp({ email, password })
  if (error) throw new Error(`Error signing up: ${error.message}`)
  return data
}

export { loginApi, logoutApi, registerApi }
