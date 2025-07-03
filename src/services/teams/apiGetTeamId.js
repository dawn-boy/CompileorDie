import checkRecord from '../database/operations/checkRecord.js'

async function apiGetTeamId(teamCode) {
  const { isFound: teamFound, data: teamData } = await checkRecord(
    'teams_table',
    'team_code',
    teamCode
  )
  if (!teamFound) return null
  const teamId = teamData?.id ?? null

  return teamId
}

export default apiGetTeamId
