import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${id}`);
    navigate('/');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-xl">
  <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">{post.title}</h1>
  {post.imageUrl && (
    <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} className="w-full h-auto mb-6 rounded-md shadow-lg" />
  )}
  <p className="text-gray-700 text-lg leading-relaxed mb-8">{post.content}</p>
  <div className="flex space-x-4">
    <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition">
      Delete
    </button>
    <Link to={`/edit/${post._id}`} className="bg-yellow-400 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-500 transition">
      Edit Post
    </Link>
  </div>
</div>

  );
};

export default PostDetails;
