import postRequest from '../database/edge_functions/postRequest.js'

async function apiTriggerRoles(teamCode) {
  const data = await postRequest('assignRoles', { teamCode })
  return data
}

export default apiTriggerRoles
