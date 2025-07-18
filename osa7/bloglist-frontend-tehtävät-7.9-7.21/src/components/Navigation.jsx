import { Link } from 'react-router-dom'
import styled from 'styled-components'


//STYLES
const NavBar = styled.nav`
  background-color: #171717;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 10px;
  border-radius: 10px;
  max-width: 700px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 5px;
  background-color: #5079ff;
  border: 2px solid #cccccc;

  &:hover {
    background-color: #1d50f6;
  }
`

const LogoutButton = styled.button`
  background-color: #5079ff;
  color: white;
  padding: 6px 12px;
  border: 2px solid #cccccc;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #1d50f6;
  }
`

const Username = styled.span`
  margin-left: auto;
  font-weight: 600;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`

//LOGIC
const Navigation = ({ user, handleLogout }) => {
  return (
    <NavBar>
      <StyledLink to="/">Blogs</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      <Username>{user.name} logged in</Username>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </NavBar>
  )
}

export default Navigation
