import postRequest from '../database/edge_functions/postRequest.js'

async function apiClearRoles(teamCode) {
  const data = await postRequest('clearRoles', { teamCode })
  return data
}

export default apiClearRoles
