import styled from 'styled-components'

//STYLES
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171717;
  padding: 20px 40px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  max-width: 700px;
  margin: 20px auto;
`

const Header = styled.h1`
  font-size: 28px;
  margin: 0;
`

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px;
`

//LOGIC
const Title = () => {
  return (
    <HeaderWrapper>
      <Header>Blog </Header>
      <Logo src="../src/img/logo.png" alt="logo" />
      <Header> App</Header>
    </HeaderWrapper>
  )
}

export default Title
