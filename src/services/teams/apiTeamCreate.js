import insertTable from '../database/operations/insertTable.js'
import apiGetUserId from '../users/apiGetUserId.js'

async function apiTeamCreate(teamName, teamCode) {
  const userId = await apiGetUserId()

  await insertTable('teams_table', {
    team_name: teamName,
    team_code: teamCode,
    created_by_user_id: userId,
  })
}

export default apiTeamCreate
