import apiTriggerRoles from '../../services/gameplay/apiTriggerRoles.js'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    async function triggerRoles() {
      await apiTriggerRoles()
    }
    triggerRoles()
  }, [])
  return <div>This is the HomePage page.</div>
}

export default HomePage
