import { useEffect } from 'react'
import ApiSupabase from '../../services/database/apiSupabase.js'
import { useSelector } from 'react-redux'

function useReport(confirm, setConfirm, selected, handleNext, updateVal) {
  const playerId = useSelector(state => state.user.playerId)
  const roundNum = useSelector(state => state.user.round)
  const cycleNum = useSelector(state => state.user.cycle)

  useEffect(() => {
    async function setChosenOne() {
      const { data, error } = await ApiSupabase.from('rounds_report')
        .update(updateVal)
        .eq('player_id', playerId)
        .eq('round_num', roundNum)
        .eq('cycle_num', cycleNum)
    }

    if (confirm === 'clicked') {
      if (!selected.choice) setConfirm('error')
      else {
        setChosenOne()
        handleNext()
      }
    }
  }, [confirm, handleNext, selected])
}

export default useReport
