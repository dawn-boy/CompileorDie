import CodeEditor from '../../ui/CodeEditor.jsx'
import { useEffect, useState } from 'react'
import runPython from '../../helpers/runPython.js'
import { incrementQuestionNumber } from '../../redux/userSlice.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import apiUpdateReport from '../../services/gameplay/apiUpdateReport.js'

const Answer = ({ id, expected_output, starter_code, inputCode = '' }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [codeRunError, setCodeRunError] = useState('')

  const roundNum = useSelector(state => state.user.round)
  const role = useSelector(state => state.user.role)
  const playerId = useSelector(state => state.user.playerId)
  const cycleNum = useSelector(state => state.user.cycle)
  const chosenOne = useSelector(state => state.user?.chosenOne?.choice)

  const [code, setCode] = useState('')
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (inputCode) setCode(inputCode.replace(/\\n/g, '\n') + '\n'.repeat(42))
    else setCode(starter_code.replace(/\\n/g, '\n') + '\n'.repeat(42))
  }, [inputCode])

  function handleNext() {
    if (output === '' && error === '') {
      setCodeRunError('Please run the code')
      return
    }
    setCodeRunError('')
    apiUpdateReport(
      code,
      id,
      expected_output,
      output,
      roundNum,
      cycleNum,
      role,
      playerId,
      chosenOne
    )
    navigate('/waiting', { replace: true })
    dispatch(incrementQuestionNumber())
  }

  function handleRun() {
    setCodeRunError('')
    setOutput('')
    setError('')
    runPython(
      code,
      text => setOutput(prev => prev + text),
      err => setError(err)
    )
    if (output === '' || error === '') {
      setCodeRunError('Type your own code, cupcake.')
      setTimeout(() => setCodeRunError(''), 1000)
    }
  }
  return (
    <div>
      <CodeEditor code={code} onChange={setCode} />
      {output && <div>Output: {output}</div>}
      {error && <div>Error: {error}</div>}
      {codeRunError && <div>{codeRunError}</div>}
      <button onClick={handleRun}>Run</button>
      <button
        onClick={() => {
          setClicked(true)
          handleNext()
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Answer
