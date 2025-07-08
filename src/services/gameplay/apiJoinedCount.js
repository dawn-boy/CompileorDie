import apiSupabase from '../database/apiSupabase.js'

async function apiJoinedCount(teamCode, roundNum, cycle_num) {
  const { data, error } = await apiSupabase
    .from('rounds_report')
    .select('*')
    .eq('team_code', teamCode)
    .eq('round_num', roundNum)
    .eq('cycle_num', cycle_num)

  console.log(roundNum, data.length, data)
  return data.length
}

export default apiJoinedCount
