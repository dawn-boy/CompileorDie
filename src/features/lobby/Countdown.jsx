import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useCountdown from '../../hooks/gameplay/useCountdown.js'

const Countdown = () => {
  const location = useLocation()
  const totalSeconds = location?.state?.seconds || 3
  const teamCode = location?.state?.teamCode || 'knife-shatters'
  const [seconds, setSeconds] = useState(totalSeconds)

  useCountdown(teamCode, seconds, setSeconds)

  return <h1>{seconds === 0 ? 'We have lift off..' : seconds}..</h1>
}

export default Countdown
