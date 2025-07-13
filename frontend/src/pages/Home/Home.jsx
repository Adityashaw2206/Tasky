// ✅ Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegSmileWink } from "react-icons/fa";

const Home = () => {
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5500/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFullname(res.data.data.fullname);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-center mt-24 px-4">
      <div className="inline-flex items-center justify-center bg-white border shadow-md rounded-full px-6 py-2 mb-6">
        <FaRegSmileWink className="text-blue-600 text-xl mr-2" />
        <h2 className="text-lg font-medium text-gray-800">
          Welcome back, <span className="font-semibold text-blue-700">{fullname || "User"}</span>!
        </h2>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">Tasky 🚀</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
        Your personal productivity assistant. Stay focused, organized, and in control of your day.
        <br className="hidden sm:block" />
        Add, track, and prioritize your tasks with ease.
      </p>
    </div>
  );
};

export default Home;
