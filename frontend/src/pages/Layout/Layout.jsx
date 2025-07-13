// // pages/Layout/index.jsx
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../Sidebar/Sidebar.jsx';
// const Layout = () => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 p-4 bg-gray-100 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;


// pages/Layout/index.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar on small screens */}
        <div className="md:hidden bg-blue-700 text-white p-4 flex items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars size={24} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Todoist</h1>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
