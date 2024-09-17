import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        console.log(res.data); // Check if this logs an array
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  

  return (
    <div>
      <h1>Blog Posts</h1>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </div>
        ))
      ) : (
        <p>No posts available or loading...</p>
      )}
    </div>
  );
  
};

export default Home;
