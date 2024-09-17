import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(''); 

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setCurrentImage(res.data.imageUrl); 
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); 
    }

    await axios.put(`/api/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-xl">
  <h1 className="text-3xl font-bold mb-6 text-yellow-500">Edit Post</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition duration-200"
      required
    />
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-40 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition duration-200"
      required
    ></textarea>
    {currentImage && (
      <div className="mb-4">
        <p>Current Image:</p>
        <img src={currentImage} alt="Current" className="w-48 h-auto rounded-md shadow-lg" />
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
      className="w-full px-4 py-3 border rounded-lg"
    />
    <button
      type="submit"
      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
    >
      Save Changes
    </button>
  </form>
</div>

  );
};

export default EditPost;
