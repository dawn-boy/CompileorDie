import { useEffect } from 'react'
import apiSupabase from '../../services/database/apiSupabase.js'
import { useDispatch } from 'react-redux'
import {
  setIsLoading,
  setProfileUser,
  setSessionUser,
} from '../../redux/userSlice.js'
import apiGetUser from '../../services/users/apiGetUser.js'
import getRecord from '../../services/database/operations/getRecord.js'

function useAuthCheck() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function getUser() {
      const user = await apiGetUser()
      if (user) {
        const { data, error } = await getRecord('users_table', 'id', user?.id)
        if (error) throw new Error(error.message)
        dispatch(setProfileUser(data[0]))
      }
      dispatch(setIsLoading(false))
    }

    getUser()

    const { data: authListener } = apiSupabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setSessionUser(session?.user ?? null))
      }
    )

    return () => authListener.subscription.unsubscribe()
  }, [dispatch])
}

export default useAuthCheck
