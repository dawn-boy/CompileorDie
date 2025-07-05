import apiSupabase from '../database/apiSupabase.js'
import apiGetTeamId from './apiGetTeamId.js'

async function apiFetchTeam(teamCode) {
  const teamId = await apiGetTeamId(teamCode)
  const { data, error } = await apiSupabase
    .from('players_table')
    .select('users_table (name), * ')
    .eq('team_id', teamId)
  if (error) return null

  const flatList = data.map(data => ({
    ...data,
    name: data.users_table.name,
  }))

  return flatList
}

export default apiFetchTeam
