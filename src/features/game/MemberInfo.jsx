import { useDispatch, useSelector } from 'react-redux'
import {
  setIsEliminated,
  updateEliminationList,
} from '../../redux/userSlice.js'
import updateRecord from '../../services/database/operations/updateRecord.js'
import { useEffect, useState } from 'react'

const MemberInfo = ({
  name,
  eliminationList,
  voteList,
  votes,
  totalVotes,
  highestVoteCount,
}) => {
  const compileCheck = eliminationList.every(val => val === true)
  const votedPlayerList = Object.keys(voteList)
  const dispatch = useDispatch()
  const team_code = useSelector(state => state.user.teamCode)
  const role = useSelector(state => state.user.role)
  const alreadyEliminatedPlayers = useSelector(
    state => state.user.eliminatedPlayers
  )
  const loggedInPlayerName = useSelector(
    state => state.user.userProfileData?.name
  )
  const [isSaved, setIsSaved] = useState(true)
  const [voteMessage, setVoteMessage] = useState('')

  useEffect(() => {
    let localIsSaved = true
    let teamSize = 5
    let halfRate = 3

    // if we've more skips than votes,
    // then those votes are invalid. Majority choose the time isn't ripe yet..
    const skips = teamSize - totalVotes

    // One says we've a clear highest voted player.
    // if the list contains 2 or 3 players that means we have a tie.
    // or if they failed to even compile the code.
    const votingCondition =
      votedPlayerList.length === 1 &&
      name === votedPlayerList[0] &&
      skips < halfRate

    // checking if all those votes are for the same player
    const votedSamePlayer = highestVoteCount === totalVotes

    function nameRoleCheck() {
      if (name.toLowerCase() === loggedInPlayerName.toLowerCase()) {
        dispatch(setIsEliminated(true))
        if (role === 'hacker') {
          updateRecord('teams_table', 'team_code', team_code, {
            team_status: 'finished',
          })
        }
      }
    }
    function updateSavedStatus(status) {
      setIsSaved(status)
      localIsSaved = status
    }

    // for bounding scenarios where we have more votes than skips, but those votes are not for one player
    // if those votes are split across different players, it's a tie
    if (votingCondition && votedSamePlayer) {
      updateSavedStatus(false)
      nameRoleCheck()
      setVoteMessage("Looks like someone's getting fired Honey!")
    }
    if (!compileCheck) {
      updateSavedStatus(false)
      nameRoleCheck()
      setVoteMessage('Whoops! Looks like someone failed to compile the code.')
    }

    if (skips >= halfRate) {
      setVoteMessage("Many chose that the time isn't ripe yet.")
    }

    if (alreadyEliminatedPlayers.includes(name.toLowerCase())) {
    }
    dispatch(updateEliminationList({ [name]: !localIsSaved }))
  }, [
    name,
    eliminationList,
    voteList,
    alreadyEliminatedPlayers,
    loggedInPlayerName,
    role,
    team_code,
    dispatch,
  ])

  function compilationErrorRounds() {
    return eliminationList
      .reduce((acc, val, index) => {
        if (!val) acc += ` ${index + 1},`
        return acc
      }, '')
      .replace(/,+$/, '')
  }

  return (
    <div>
      <h1>
        {name} - {isSaved ? 'Trusted' : 'Fired'}
      </h1>
      {votes.length > 0 && (
        <h4>
          votes:
          {votes.map(player => (
            <span>{'\n' + player}</span>
          ))}
        </h4>
      )}
      <h5>
        {!compileCheck && (
          <span>Code did not compile at round {compilationErrorRounds()}</span>
        )}
      </h5>
    </div>
  )
}

export default MemberInfo
