// pages/LandingPage/index.jsx
// pages/LandingPage/index.jsx
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to Todoist Clone</h1>
      <p className="text-lg text-gray-600 mb-6">A minimal task management app</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
