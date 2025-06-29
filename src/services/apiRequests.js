async function getData() {
  try {
    const response = await fetch('http://localhost:8080/compileOrDieApi')
    if (!response.ok) throw new Error(response.statusText)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export { getData }
