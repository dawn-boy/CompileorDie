import { useMutation } from 'react-query'
import apiTogglePlayerStatus from '../../services/teams/apiTogglePlayerStatus.js'

function usePlayerToggle() {
  const {
    isLoading,
    mutate: togglePlayerStatus,
    isError,
    error,
  } = useMutation({
    mutationFn: apiTogglePlayerStatus,
  })

  return { isLoading, togglePlayerStatus, isError, error }
}

export default usePlayerToggle
