import apiSupabase from '../database/apiSupabase.js'

async function apiAnsweredCount(teamCode, roundNum) {
  const { data, error } = await apiSupabase
    .from('rounds_report')
    .select('*')
    .eq('team_code', teamCode)
    .eq('round_num', roundNum)
  const finished = data.reduce((acc, cur) => {
    if (cur.answer !== null) acc += 1
    return acc
  }, 0)

  return finished
}

export default apiAnsweredCount
