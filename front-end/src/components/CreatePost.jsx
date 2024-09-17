import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
        await axios.post('http://localhost:5000/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-xl">
  <h1 className="text-3xl font-bold mb-6 text-indigo-600">Create a New Post</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
      required
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-40 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
      required
    ></textarea>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
      className="w-full px-4 py-3 border rounded-lg"
    />
    <button
      type="submit"
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
    >
      Create Post
    </button>
  </form>
</div>

  );
};

export default CreatePost;
