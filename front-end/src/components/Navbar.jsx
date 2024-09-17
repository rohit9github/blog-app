import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold tracking-wide">
                    My Blog
                </Link>
                <div className="space-x-6">
                    <Link to="/" className="text-lg hover:text-gray-200 transition-colors duration-200">Home</Link>
                    <Link to="/create" className="text-lg hover:text-gray-200 transition-colors duration-200">Create Post</Link>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
