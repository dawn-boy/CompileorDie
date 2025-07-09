import ApiSupabase from '../database/apiSupabase.js'

async function apiTeamCheck(teamCode, teamName) {
  const { data, error } = await ApiSupabase.from('teams_table')
    .select('*')
    .or(`team_code.eq.${teamCode}`, `team_name.eq.${teamName}`)

  return data.length > 0
}
export default apiTeamCheck
