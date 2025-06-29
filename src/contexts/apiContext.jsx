import { useContext, createContext, useState, useEffect } from 'react'
import { getData } from '../services/apiRequests.js'

const ApiContext = createContext()

function ApiProvider({ children }) {
  const [response, setResponse] = useState({
    action: 'onError',
    message: "You can't just jump in and expect things to work.",
  })
  const [change, setChange] = useState(true)

  function refreshAPI() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getData()
        setResponse(data)
        resolve(data)
      } catch (error) {
        setResponse({ action: 'onError', error })
        reject(error)
      }
    })
  }

  return (
    <ApiContext.Provider value={{ response, refreshAPI }}>
      {children}
    </ApiContext.Provider>
  )
}
function useAPI() {
  return useContext(ApiContext)
}

export { ApiProvider, useAPI }
