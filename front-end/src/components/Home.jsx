import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-600">Blog Posts</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-xl">
          {post.imageUrl && (
            <img
              src={`http://localhost:5000${post.imageUrl}`}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{post.title}</h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            <Link to={`/posts/${post._id}`} className="block mt-4 text-indigo-500 hover:underline">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Home;
