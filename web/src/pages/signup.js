import React, { useState, useContext } from "react"
import styled from "styled-components"
import { FirebaseContext } from "../components/Firebase"

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

const Signup = () => {
  const { firebase } = useContext(FirebaseContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  })

  const handleOnChange = (e) => {
    e.persist()
    setErrorMessage("")
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    formValues.password === formValues.confirmPassword
      ? firebase
          .signup({
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
          })
          .catch((error) => {
            setErrorMessage(error.message)
          })
      : setErrorMessage("Password and confirm password fields must match!")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={handleOnChange}
        value={formValues.username}
        placeholder="username"
        type="text"
        required
        name="username"
      />
      <Input
        onChange={handleOnChange}
        value={formValues.email}
        placeholder="email"
        type="email"
        required
        name="email"
      />
      <Input
        onChange={handleOnChange}
        value={formValues.password}
        placeholder="password"
        type="password"
        required
        minLength={6}
        name="password"
      />
      <Input
        onChange={handleOnChange}
        value={formValues.confirmPassword}
        placeholder="confirm password"
        type="password"
        required
        minLength={6}
        name="confirmPassword"
      />
      {!!errorMessage && <span>{errorMessage}</span>}
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default Signup
