import UserTile from './UserTile.jsx'
import { useSelector } from 'react-redux'
import usePlayerToggle from '../../hooks/database/usePlayerToggle.js'

function UserGrid({ userData }) {
  const currentUserData = useSelector(state => state.user.userProfileData)
  const { isLoading, error, isError, togglePlayerStatus } = usePlayerToggle()

  if (!currentUserData || !userData) return <div>Loading...</div>

  const name = currentUserData.name
  const currentUser = userData.find(user => user.name === name)
  const teamMembers = userData.filter(user => user.name !== name)

  if (isError) return <div>{error}</div>
  console.log(isLoading, currentUser, teamMembers, userData)
  return (
    <div>
      <div>
        <h1>{currentUser?.name}</h1>
        <h3>{currentUser?.status === 'ready' ? 'Ready' : 'Not Ready'}</h3>
        <button onClick={togglePlayerStatus} disabled={isLoading}>
          {currentUser?.status === 'ready' ? 'Not Ready' : 'Ready'}
        </button>
      </div>
      {teamMembers.map(({ name, status }, index) => (
        <UserTile key={index} name={name} status={status} />
      ))}
    </div>
  )
}

export default UserGrid
