import React from 'react';
import { Link } from "react-router-dom";
import { Settings, User, LogOut, MessageSquare } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="w-full top-0 z-40 relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-xl backdrop-blur-lg rounded-3xl">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-500 opacity-10"></div>
        <div className="absolute right-20 -bottom-4 w-32 h-32 rounded-full bg-blue-400 opacity-10"></div>
        <div className="absolute left-1/2 -top-8 w-16 h-16 rounded-full bg-blue-300 opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="h-9 w-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-300" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 text-transparent bg-clip-text">
                Nexus
              </h1>
            </Link>
          </div>

          {/* Right side menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 rounded-full bg-blue-800/50 border border-blue-700 text-blue-100 hover:bg-blue-700/50 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <Settings className="h-4 w-4 text-blue-300 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 rounded-full bg-blue-800/50 border border-blue-700 text-blue-100 hover:bg-blue-700/50 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <User className="h-4 w-4 text-blue-300 mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 rounded-full bg-red-900/30 border border-red-800/50 text-red-200 hover:bg-red-900/50 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                >
                  <LogOut className="h-4 w-4 text-red-300 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;