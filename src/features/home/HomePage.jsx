import apiTriggerRoles from '../../services/gameplay/apiTriggerRoles.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  useEffect(() => {
    async function triggerRoles() {
      await apiTriggerRoles()
    }
    triggerRoles()
  }, [])
  return (
    <div>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <div>This is the HomePage page.</div>
    </div>
  )
}

export default HomePage
