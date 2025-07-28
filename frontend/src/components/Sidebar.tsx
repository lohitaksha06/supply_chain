import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  userRole: string;
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const links: Record<string, SidebarLink[]> = {
    company: [
      {
        name: 'Dashboard',
        path: '/company/dashboard',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ),
      },
      {
        name: 'Register Batch',
        path: '/register',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
      },
      {
        name: 'View Batches',
        path: '/batches',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
      },
    ],
    hospital: [
      {
        name: 'Dashboard',
        path: '/hospital/dashboard',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ),
      },
      {
        name: 'Verify Batch',
        path: '/verify',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
    customer: [
      {
        name: 'Dashboard',
        path: '/customer/dashboard',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ),
      },
      {
        name: 'Track Medicine',
        path: '/track',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ),
      },
    ],
  };

  const currentLinks = links[userRole] || [];

  return (
    <div 
      className={`bg-gray-800 text-white h-screen ${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out fixed left-0 top-0`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-gray-800 rounded-full p-1 text-white"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Logo */}
      <div className="p-4">
        <span className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>
          PharmaChain
        </span>
        <span className={`text-xl font-bold ${isCollapsed ? 'block' : 'hidden'}`}>
          PC
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8">
        {currentLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-4 py-3 transition-colors duration-200
              ${
                location.pathname === link.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
          >
            <span className="inline-block">{link.icon}</span>
            <span className={`ml-4 ${isCollapsed ? 'hidden' : 'inline'}`}>
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
