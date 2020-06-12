import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/Firebase"
import styled from "styled-components"

import SEO from "../components/seo"

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;

  span {
    color: red;
    margin: 0 auto;
  }
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: none;

  &:focus,
  &:active {
    border: 1px solid rebeccapurple;
  }
`

const Button = styled.button`
  display: block;
  width: 100%;
`

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    firebase
      .login({ email: formValues.email, password: formValues.password })
      .catch((error) => {
        // console.log(error)
        setErrorMessage(error.message)
      })
  }

  console.log(errorMessage)

  const handleOnChange = (e) => {
    e.persist()
    setErrorMessage("")
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <SEO title="Login Page" />
      <Form onSubmit={handleSubmit}>
        <Input
          required
          value={formValues.email}
          name="email"
          onChange={handleOnChange}
          placeholder="email"
          type="email"
        />
        <Input
          required
          value={formValues.password}
          name="password"
          onChange={handleOnChange}
          placeholder="password"
          type="password"
        />
        {!!errorMessage && <span>{errorMessage}</span>}
        <Button type="submit">Login</Button>
      </Form>
    </>
  )
}
export default Login
