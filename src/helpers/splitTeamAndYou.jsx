function splitTeamAndYou(userData, currentUserData) {
  if (!currentUserData || !userData) return <div>Loading...</div>
  const name = currentUserData.name
  const currentUser = userData.find(user => user.name === name)
  const teamMembers = userData.filter(user => user.name !== name)
  return { currentUser, teamMembers }
}
export default splitTeamAndYou
