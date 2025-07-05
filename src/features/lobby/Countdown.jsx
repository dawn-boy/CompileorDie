import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useCountdown from '../../hooks/gameplay/useCountdown.js'
import apiGetCurrentRole from '../../services/users/apiGetCurrentRole.js'
import apiResetPlayersStatus from '../../services/teams/apiResetPlayersStatus.js'

const Countdown = () => {
  const location = useLocation()
  const totalSeconds = location?.state?.seconds || 3
  const teamCode = location?.state?.teamCode || 'knife-shatters'
  const [seconds, setSeconds] = useState(totalSeconds)
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [roleLoading, setRoleLoading] = useState(true)
  useCountdown(teamCode, seconds, setSeconds, setIsLoading)

  useEffect(() => {
    async function resetPlayerStatus() {
      const players = await apiResetPlayersStatus(teamCode)
    }
    resetPlayerStatus()
  }, [teamCode])
  useEffect(() => {
    async function getRole() {
      const currentRole = await apiGetCurrentRole()
      setRole(currentRole)
      setRoleLoading(false)
    }
    if (!isLoading) getRole()
    if (!isLoading && !roleLoading && seconds === 0)
      navigate('/gameplay', { replace: true, state: { role } })
  }, [isLoading, roleLoading, seconds, navigate, role])

  return (
    <h1>{seconds === 1 || seconds === 0 ? 'We have lift off..' : seconds}..</h1>
  )
}

export default Countdown
