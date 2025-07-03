import { useQuery } from 'react-query'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'

function useTeamView(teamCode) {
  const {
    data: teamData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teamCode', teamCode],
    queryFn: () => apiFetchTeam(teamCode),
    enabled: !!teamCode,
  })
  return { teamData, isLoading, error }
}

export default useTeamView
