import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../features/users/usersSlice'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


//STYLES
const UsersContainer = styled.div`
  background-color: #171717;
  padding: 20px 40px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px auto;
  max-width: 700px;
`

const Title = styled.h2`
  margin-bottom: 20px;
  text-decoration: underline;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: #222;
`

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #444;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1e1e1e;
  }
`

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #333;
`

const StyledLink = styled(Link)`
  color: #5079ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

//LOGIC
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((store) => store.users)

  //FETCH USERS VIA REDUX
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await usersService.getAll()
        dispatch(setUsers(users))
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [dispatch])

  return (
    <UsersContainer>
      <Title>Users</Title>
      <StyledTable>
        <TableHead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Blogs created</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </UsersContainer>
  )
}

export default Users
