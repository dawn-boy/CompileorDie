import { useQuery, useQueryClient } from 'react-query'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'
import { useEffect } from 'react'
import apiSupabase from '../../services/database/apiSupabase.js'

function useTeamViewRealtime(teamCode) {
  const queryClient = useQueryClient()
  const {
    data: teamData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teamCode', teamCode],
    queryFn: () => apiFetchTeam(teamCode),
    enabled: !!teamCode,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const channel = apiSupabase
      .channel(`players_table:${teamCode}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players_table',
        },
        async payload => {
          const newTeam = await apiFetchTeam(teamCode)
          queryClient.setQueryData(['teamCode', teamCode], newTeam)
        }
      )
      .subscribe()

    return () => apiSupabase.removeChannel(channel)
  }, [teamCode, queryClient, teamData])

  return { teamData, isLoading, error }
}

export default useTeamViewRealtime
