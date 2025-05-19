import React, { useEffect, useState } from 'react'
import './App.css'
import UserProvider from './context/userProvider'
import { cookiesDefault, getToken } from './helpers/helpers'
import AppRouter from './routes/AppRouter'
// import { IntlProvider, FormattedMessage } from "react-intl";
// import MensajeUS from "./utils/lang/en-us.json";

function App() {
  const [tokenAuth, setTokenAuth] = useState([])
  const [bandera, setBandera] = useState(false)

  useEffect(() => {
    const tokenData = getToken()
    setTokenAuth(tokenData)
  }, [bandera])

  useEffect(() => {
    cookiesDefault()
  }, [])
  return (
    <div className='App'>
      <UserProvider>
        <AppRouter
          bandera={bandera}
          setBandera={setBandera}
          token={tokenAuth}
        />
      </UserProvider>
    </div>
  )
}

export default App
