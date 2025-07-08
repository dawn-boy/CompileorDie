import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import apiSupabase from '../services/database/apiSupabase.js'
import apiAnsweredCount from '../services/gameplay/apiAnsweredCount.js'
import { useNavigate } from 'react-router-dom'
import { incrementRound } from '../redux/userSlice.js'
import apiJoinedCount from '../services/gameplay/apiJoinedCount.js'

const Waiting = () => {
  const teamCode = useSelector(state => state.user.teamCode)
  const roundNum = useSelector(state => state.user.round)
  const cycleNum = useSelector(state => state.user.cycle)
  const [remaining, setRemaining] = useState(5)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateRemaining = useCallback(async () => {
    let count
    if (roundNum === 4 || roundNum === 5)
      count = (await apiJoinedCount(teamCode, roundNum, cycleNum)) || 0
    else count = (await apiAnsweredCount(teamCode, roundNum, cycleNum)) || 0

    setRemaining(5 - count)
  }, [teamCode, roundNum])

  useEffect(() => {
    updateRemaining()
  }, [roundNum, teamCode, updateRemaining])

  useEffect(() => {
    const rounds_table = apiSupabase
      .channel(`rounds:${teamCode}:${roundNum}:${cycleNum}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rounds_report',
        },
        async payload => updateRemaining()
      )
      .subscribe()
    return () => apiSupabase.removeChannel(rounds_table)
  }, [updateRemaining])

  useEffect(() => {
    if (remaining === 0) {
      dispatch(incrementRound())
      navigate('/gameplay', { replace: true })
    }
  }, [remaining, dispatch, navigate])
  return (
    <div>
      <h1>This is the Waiting page.</h1>
      <h3>
        Still {remaining} {remaining === 1 ? 'employee is' : 'employees are'}{' '}
        yet to join us..
      </h3>
    </div>
  )
}

export default Waiting
