
// // App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/register.jsx';
import Layout from './pages/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import AddTask from './pages/AddTask/AddTask.jsx';
import Logout from './pages/Logout/Logout.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';
import Sidebar from './pages/Sidebar/Sidebar.jsx';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes (NOT wrapped in Layout) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
