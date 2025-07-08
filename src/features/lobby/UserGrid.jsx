import UserTile from './UserTile.jsx'
import { useDispatch, useSelector } from 'react-redux'
import usePlayerToggle from '../../hooks/database/usePlayerToggle.js'
import splitTeamAndYou from '../../helpers/splitTeamAndYou.jsx'
import { setQuestions, setTeam } from '../../redux/userSlice.js'
import { FormProvider, useForm } from 'react-hook-form'
import Form from '../../forms/Form.jsx'
import { useEffect, useState } from 'react'
import updateRecord from '../../services/database/operations/updateRecord.js'
import getRecord from '../../services/database/operations/getRecord.js'
import apiSupabase from '../../services/database/apiSupabase.js'
import capitalize from '../../helpers/capitalize.js'

function UserGrid({ userData, admin }) {
  const { isLoading, error, isError, togglePlayerStatus } = usePlayerToggle()
  const dispatch = useDispatch()
  const methods = useForm()
  const [difficulty, setDifficulty] = useState({ difficulty: null })
  const teamCode = useSelector(state => state.user.teamCode)
  const [difficultyStatus, setDifficultyStatus] = useState('easy')
  const currentUserData = useSelector(state => state.user.userProfileData)
  const { currentUser, teamMembers } = splitTeamAndYou(
    userData,
    currentUserData
  )
  function onSubmit(resp) {
    setDifficulty(resp)
  }
  const options = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ]
  useEffect(() => {
    async function getQuestions(difficulty) {
      const { data, error } = await getRecord(
        'questions_table',
        'difficulty',
        difficulty
      )
      if (data) {
        dispatch(setQuestions(data))
      }
    }

    async function getDifficulty() {
      const { data, error } = await getRecord(
        'teams_table',
        'team_code',
        teamCode
      )
      if (data) {
        setDifficultyStatus(data[0].difficulty)
        getQuestions(data[0].difficulty)
      }
    }
    getDifficulty()

    const channel = apiSupabase
      .channel(`difficulty:${teamCode}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'teams_table',
        },
        async payload => {
          setDifficultyStatus(payload.new.difficulty)
          getQuestions(payload.new.difficulty)
        }
      )
      .subscribe()

    return () => {
      apiSupabase.removeChannel(channel)
    }
  }, [teamCode, setDifficultyStatus])

  useEffect(() => {
    dispatch(setTeam(userData))
  }, [dispatch, userData])

  useEffect(() => {
    async function updateDifficulty() {
      if (difficulty.difficulty !== null) {
        const { data, error } = await updateRecord(
          'teams_table',
          'team_code',
          teamCode,
          {
            difficulty: difficulty.difficulty,
          }
        )
      }
    }
    updateDifficulty()
  }, [difficulty])

  if (isError) return <div>{error}</div>
  return (
    <div>
      <div>
        <h1>{currentUser?.name}</h1>
        {currentUser?.user_id === admin && (
          <FormProvider {...methods}>
            <Form onSubmit={onSubmit}>
              <Form.LabeledSelect name="difficulty" options={options} />
              <button>Submit</button>
            </Form>
          </FormProvider>
        )}
        <h3>Difficulty Level: {capitalize(difficultyStatus)}</h3>
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
