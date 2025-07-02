import { useLocation, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  let message = useRouteError()?.data
  const location = useLocation()
  if (!message)
    message =
      location?.state?.errorMessage ||
      'An Unknown Error from outside the far away galaxy occurred.. Quick, get the creator.'
  return <h1>Encountered an Error: {message}</h1>
}

export default ErrorPage
