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
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/edit/${post._id}`}>Edit Post</Link>
    </div>
  );
};

export default PostDetails;
