import checkRecord from '../database/operations/checkRecord.js'

async function apiFetchTeam(teamCode) {
  const { isFound, data } = await checkRecord(
    'teams_table',
    'team_code',
    teamCode
  )
  return { isFound, data }
}

export default apiFetchTeam
