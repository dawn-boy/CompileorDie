import { useQuery, useQueryClient } from 'react-query'
import apiFetchTeam from '../../services/teams/apiFetchTeam.js'
import { useEffect } from 'react'
import apiSupabase from '../../services/database/apiSupabase.js'
import updateRecord from '../../services/database/operations/updateRecord.js'

function useTeamViewRealtime(teamCode, setAllReady) {
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
          if (
            newTeam.length === 5 &&
            newTeam.every(player => player.status === 'ready')
          ) {
            setAllReady(true)
          } else {
            setAllReady(false)
          }
        }
      )
      .subscribe()

    return () => apiSupabase.removeChannel(channel)
  }, [teamCode, queryClient, teamData])

  return { teamData, isLoading, error }
}

export default useTeamViewRealtime
