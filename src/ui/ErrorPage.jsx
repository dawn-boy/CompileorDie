import { useRouteError } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ErrorPage = () => {
  const [message, setMessage] = useState('')
  const error = 'Something went wrong. Please try again later.'
  const routeError = useRouteError()

  useEffect(() => {
    if (routeError?.data) setMessage(routeError.data.split('Error')[1])
    else setMessage(error)
  }, [error, routeError])

  return <h1>Encountered an Error: {message}</h1>
}

export default ErrorPage
