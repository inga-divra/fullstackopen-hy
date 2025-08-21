import { useState } from "react";
import { useApolloClient } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";



const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button type="button" onClick={() => setPage("authors")}>Authors</button>
        <button type="button" onClick={() => setPage("books")}>Books</button>
        {token && <button type="button" onClick={() => setPage("add")}>Add book</button>}
        {token && <button type="button" onClick={() => setPage("recommend")}>Recommend</button>}
        {token ?
          <button type="button" onClick={logout}>Logout</button> :
          <button type="button" onClick={() => setPage("login")}>Login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommend"} />

      <LoginForm show={page === "login"} setError={notify} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
