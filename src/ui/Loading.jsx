import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getData } from '../services/apiRequests.js'

const Loading = () => {
  const navigate = useNavigate()
  return <div>This is the Loading page.</div>
}

export default Loading
