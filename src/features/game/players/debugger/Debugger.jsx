import Role from '../../Role.jsx'
import UserInput from '../../UserInput.jsx'
import PlayerChoice from '../../PlayerChoice.jsx'
import Vote from '../../Vote.jsx'
import ErrorPage from '../../../../ui/ErrorPage.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ApiSupabase from '../../../../services/database/apiSupabase.js'

const Debugger = () => {
  const round = useSelector(state => state.user.round)
  const showWelcomeScreen = useSelector(state => state.user.showWelcomeScreen)
  const chosenOne = useSelector(state => state.user.chosenOne?.choice)
  const cycle = useSelector(state => state.user.cycle)
  const teamCode = useSelector(state => state.user.teamCode)
  const [inputCode, setInputCode] = useState('')

  useEffect(() => {
    if (round === 3) {
      async function getRecord() {
        const { data, error } = await ApiSupabase.from('rounds_report')
          .select('*')
          .eq('player_id', chosenOne)
          .eq('round_num', 2)
          .eq('cycle_num', cycle)
          .eq('team_code', teamCode)
        setInputCode(data[0]?.answer?.replace(/\\n/g, '\n') + '\n'.repeat(42))
      }
      getRecord()
    }
  }, [])

  switch (round) {
    case 1:
      if (showWelcomeScreen) {
        return <Role />
      }
      return <UserInput />

    case 2:
      if (!chosenOne) {
        return <PlayerChoice />
      }
      return <UserInput />
    case 3:
      return <UserInput inputCode={inputCode} />
    case 4:
      return <Vote />
    default:
      return <ErrorPage message={"Round doesn't exist"} />
  }
}

export default Debugger
