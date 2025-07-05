import { useEffect, useState } from 'react'
import startCountdown from '../../features/lobby/startCountdown.js'
import apiTriggerRoles from '../../services/gameplay/apiTriggerRoles.js'

function useCountdown(teamCode, seconds, setSeconds) {
  useEffect(() => {
    async function assignRoles() {
      const [countdownResult, assignmentResult] = await Promise.all([
        startCountdown(seconds, setSeconds),
        apiTriggerRoles(teamCode),
      ])
      console.log(countdownResult, assignmentResult)
    }
    assignRoles()
  }, [])
}

export default useCountdown
