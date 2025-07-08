import ApiSupabase from '../database/apiSupabase.js'

async function updateReport(
  code,
  id,
  expected_output,
  output,
  roundNum,
  cycleNum,
  role,
  playerId,
  chosenOne
) {
  let isCompilable
  if (output.trim() == expected_output.trim()) isCompilable = true
  else isCompilable = false

  if (
    (roundNum === 2 && role === 'hacker') ||
    (roundNum === 3 && role === 'debugger')
  ) {
    await ApiSupabase.from('rounds_report')
      .update({
        question: id,
        answer: code.trim(),
        isCompilable: true,
      })
      .eq('player_id', playerId)
      .eq('round_num', roundNum)
      .eq('cycle_num', cycleNum)

    let roundBasedonRole
    if (role === 'hacker') roundBasedonRole = 1
    if (role === 'debugger') roundBasedonRole = 2

    await ApiSupabase.from('rounds_report')
      .update({
        isCompilable: isCompilable,
      })
      .eq('player_id', chosenOne)
      .eq('round_num', roundBasedonRole)
      .eq('cycle_num', cycleNum)
  } else {
    await ApiSupabase.from('rounds_report')
      .update({
        question: id,
        answer: code.trim(),
        isCompilable: isCompilable,
      })
      .eq('player_id', playerId)
      .eq('round_num', roundNum)
      .eq('cycle_num', cycleNum)
  }
}

export default updateReport
