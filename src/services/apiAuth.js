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
async function registerApi(registerData) {
  const { data, error } = await apiSupabase.auth.signUp(registerData)
  if (error) throw new Error(`Error signing up: ${error.message}`)
  return { data, registerData }
}
async function getCurrentUser() {
  const { data: user, error } = await apiSupabase.auth.getUser()
  if (error) throw new Error(`Error getting user: ${error.message}`)
  return user?.user
}

export { loginApi, logoutApi, registerApi, getCurrentUser }
