import React, { useContext, useEffect, useState } from "react"

import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import MainHeader from "./components/MainHeader/MainHeader"
import AuthContext from "./components/store/AuthContext"

function App() {
  const ctx = useContext(AuthContext)
  const { isLoggedIn } = ctx

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  )
}

export default App
