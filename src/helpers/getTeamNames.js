import splitTeamAndYou from './splitTeamAndYou.jsx'

function getTeamNames(teamData, currentUserData) {
  const { teamMembers } = splitTeamAndYou(teamData, currentUserData)
  const team = teamMembers.map(player => ({
    name: player.name.toUpperCase(),
    id: player.id,
  }))
  return team
}

export default getTeamNames
