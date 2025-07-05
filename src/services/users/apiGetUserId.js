import apiGetLoggedInUser from './apiGetLoggedInUser.js'

async function apiGetUserId() {
  const user = await apiGetLoggedInUser()
  return user?.id
}

export default apiGetUserId
