import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const message = useRouteError().data
  return <h1>Encountered an Error: {message}</h1>
}

export default ErrorPage
