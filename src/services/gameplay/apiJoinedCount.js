import apiSupabase from '../database/apiSupabase.js'

async function apiJoinedCount(teamCode, roundNum, cycle_num) {
  const { data, error } = await apiSupabase
    .from('rounds_report')
    .select('haveVoted')
    .eq('team_code', teamCode)
    .eq('round_num', 4)
    .eq('cycle_num', cycle_num - 1)

  const count = Object.entries(data).reduce((acc, [key, val]) => {
    if (val.haveVoted === true) acc += 1
    return acc
  }, 0)
  console.log(count)
  return count
}

export default apiJoinedCount
