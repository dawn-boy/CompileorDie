import { useEffect } from 'react'

function Timer(seconds, setSeconds) {
  useEffect(() => {
    if (seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds(seconds - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds])
}

export default Timer
