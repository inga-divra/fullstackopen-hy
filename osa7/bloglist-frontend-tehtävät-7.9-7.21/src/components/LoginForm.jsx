import PropTypes from 'prop-types'
import styled from 'styled-components'

//STYLES

const FormContainer = styled.div`
  background-color: #171717;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  margin: 50px auto;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: white;

  &:focus {
    outline: none;
    border-color: #555;
  }
`

const LoginButton = styled.button`
  background-color: #5079ff;
  color: white;
  padding: 10px 26px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    background-color: #1d50f6;
  }
`

//Component´s logic

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <FormContainer>
      <Title>Login</Title>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input value={username} onChange={handleUsernameChange} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputGroup>
        <LoginButton type="submit">Login</LoginButton>
      </Form>
    </FormContainer>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
export default LoginForm
