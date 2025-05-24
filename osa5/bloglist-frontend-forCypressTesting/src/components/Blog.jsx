import { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  //Styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  //INCREASE LIKES
  const increaseLikes = async () => {
    try {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1,
        user: blog.user._id || blog.user
      }
      setLikes(likes + 1)
      await handleLike(blog.id, updatedBlog)

    } catch (error) {
      console.error(error)
    }
  }

  //SHOW REMOVE BTN
  const showRemoveBtn = blog.user?.username === user.username

  const handleRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {!visible ? (
        <div >
          {blog.title} {blog.author}
          <button id='view-btn' type="button" onClick={() => setVisible(true)}>view</button>
        </div>

      ) : (

        <div>
          {blog.title} {blog.author}
          <button type="button" onClick={() => setVisible(false)}>hide</button>
          <a href={blog.url} style={{ display: 'block' }}>{blog.url}</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p>Likes {likes}</p>
            <button id='like-btn' type="button" onClick={increaseLikes}>like</button>
          </div>
          <p>User: {blog.user?.name}</p>

          {showRemoveBtn && <button id='remove-btn' type="button" onClick={handleRemove} style={{
            background: 'blue', color: 'white', border: '1px solid grey',
            borderRadius: '5px',
            padding: '4px 8px',
            cursor: 'pointer',
            marginBottom: '4px'
          }}>remove</button>}

        </div>
      )}
    </div>
  )

}
export default Blog