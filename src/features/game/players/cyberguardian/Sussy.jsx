import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import capitalize from '../../../../helpers/capitalize.js'
import { useSelector } from 'react-redux'

const Sussy = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const chosenOne = location.state?.selected
  const teamData = location.state?.teamData
  const role = useSelector(state => state.user.role)

  const chosenOneData = teamData.filter(
    player => player.id === chosenOne.choice
  )

  useEffect(() => {
    setTimeout(() => {
      navigate('/gameplay', { replace: true, state: { role } })
    }, 2000)
  }, [])

  return (
    <h1>
      {capitalize(chosenOneData[0].name || 'player')} is{' '}
      {chosenOneData[0].role === 'hacker' ? '' : 'not'} The Hacker
    </h1>
  )

  return <div>This is the Sussy page.</div>
}

export default Sussy
