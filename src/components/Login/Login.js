import React, { useContext, useEffect, useReducer, useState } from "react"

import Card from "../UI/Card/Card"
import classes from "./Login.module.css"
import Button from "../UI/Button/Button"
import AuthContext from "../store/AuthContext"
import Input from "../Input/Input"

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.includes("@") }
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") }
    default:
      return { value: "", isValid: false }
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.length > 6 }
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.length > 6 }
    default:
      return { value: "", isValid: false }
  }
}

const Login = (props) => {
  const ctx = useContext(AuthContext)

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("")
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: null })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => dispatchEmail({ type: "USER_INPUT", value: event.target.value })
  const passwordChangeHandler = (event) => dispatchPassword({ type: "USER_INPUT", value: event.target.value })

  const validateEmailHandler = () => dispatchEmail({ type: "INPUT_BLUR" })
  const validatePasswordHandler = () => dispatchPassword({ type: "INPUT_BLUR" })

  const submitHandler = (event) => {
    event.preventDefault()
    ctx.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailIsValid}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          value={emailState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordIsValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
