
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaSignOutAlt, FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg ${
      pathname === path ? "bg-blue-600" : "hover:bg-blue-600"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-blue-700 text-white p-6 shadow-md flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div>
          {/* Close button on mobile */}
          <div className="flex justify-between items-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold tracking-wide">Todoist</h1>
            <button onClick={onClose}>
              <FaTimes size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            <Link to="/home" className={linkClass("/home")} onClick={onClose}>
              <FaHome /> Home
            </Link>
            <Link
              to="/home/add-task"
              className={linkClass("/home/add-task")}
              onClick={onClose}
            >
              <FaPlus /> Add Task
            </Link>
            <Link
              to="/home/tasks"
              className={linkClass("/home/tasks")}
              onClick={onClose}
            >
              <FaList /> View Tasks
            </Link>
          </nav>
        </div>
        <div className="mt-8">
          <Link
            to="/home/logout"
            className="flex items-center gap-3 px-4 py-2 text-red-200 hover:text-white hover:bg-red-600 rounded-lg"
            onClick={onClose}
          >
            <FaSignOutAlt /> Logout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
