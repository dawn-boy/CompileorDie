import apiSupabase from '../database/apiSupabase.js'

async function apiRegister(registerData) {
  const { data, error } = await apiSupabase.auth.signUp(registerData)
  if (error) throw new Error(`Error signing up: ${error.message}`)
  return { data, registerData }
}

export default apiRegister
