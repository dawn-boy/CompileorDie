import { useEffect, useState } from 'react'
import ApiSupabase from '../../services/database/apiSupabase.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MemberInfo from './MemberInfo.jsx'

const Elimination = () => {
  const navigate = useNavigate()

  const teamCode = useSelector(state => state.user.teamCode)
  const cycle = useSelector(state => state.user.cycle)

  const [clicked, setClicked] = useState(false)
  const [teamEval, setTeamEval] = useState({})
  const [voteList, setVoteList] = useState({})

  useEffect(() => {
    async function getTeamData() {
      const { data, error } = await ApiSupabase.from('rounds_report')
        .select('*, players_table!player_id (users_table (name)) )')
        .eq('team_code', teamCode)
        .eq('cycle_num', cycle - 1)
      const teamData = data.reduce((acc, curr) => {
        const name = curr?.players_table?.users_table?.name
        const user_data = data.filter(
          player => player.player_id === curr.player_id
        )
        const compilation = user_data.reduce((acc, curr) => {
          acc.push(curr.isCompilable)
          return acc
        }, [])
        if (name)
          acc[name] = { player_id: curr.player_id, compilation: compilation }

        return acc
      }, {})
      const voteList = data.reduce((acc, curr) => {
        const player_id = curr?.player_id
        const name = curr?.players_table?.users_table?.name
        const votedPeople = data
          .filter(
            player =>
              player.round_num === 4 &&
              player.cycle_num === cycle - 1 &&
              player.player_id !== player_id &&
              player.voted === player_id
          )
          .map(player => player.players_table.users_table.name)
          .filter(Boolean)

        if (player_id) acc[name] = votedPeople
        return acc
      }, {})

      const totalVotes = Object.entries(voteList).reduce((acc, [key, val]) => {
        if (val.length !== 0) acc += val.length
        return acc
      }, 0)

      let highestVoteCount = 0
      let highestVoted = {}

      for (const [name, votes] of Object.entries(voteList)) {
        if (votes.length > highestVoteCount) {
          highestVoteCount = votes.length
          highestVoted = { [name]: votes.length }
        } else if (votes.length === highestVoteCount) {
          highestVoted[name] = votes.length
        }
      }

      setVoteList(highestVoted)

      const finalEliminationList = Object.keys(teamData).reduce((acc, name) => {
        acc[name] = {
          ...teamData[name],
          votes: voteList[name] || [],
          totalVotes,
          highestVoteCount,
        }
        return acc
      }, {})

      setTeamEval(finalEliminationList)
    }
    getTeamData()
  }, [])

  useEffect(() => {
    if (clicked) {
      navigate('/gameplay', { replace: true })
    }
  }, [clicked])

  const teamData = Object.entries(teamEval)

  return (
    <div>
      <h1>This is the Elimination page.</h1>
      <div>
        {teamData.map(([name, data]) => (
          <MemberInfo
            key={name}
            name={name}
            eliminationList={data.compilation}
            votes={data.votes}
            voteList={voteList}
            totalVotes={data.totalVotes}
            highestVoteCount={data.highestVoteCount}
          />
        ))}
      </div>
      <button onClick={() => setClicked(true)}>Next</button>
    </div>
  )
}

export default Elimination
