function startCountdown(seconds, setSeconds) {
  return new Promise(resolve => {
    let remaining = seconds
    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval)
        resolve('Countdown finished')
        return
      }
      remaining--
      setSeconds(remaining)
    }, 1000)
  })
}

export default startCountdown
