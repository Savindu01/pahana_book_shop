import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 text-gray-100 h-screen shadow-2xl border-r border-gray-700/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 -right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Header Section */}
      <div className="p-6 border-b border-gray-700/50 relative">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm p-3 rounded-xl border border-blue-400/30">
            <svg
              className="w-10 h-10 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-3 relative">
        <Link
          to="/dashboard"
          className={`mb-2 px-4 py-3 flex items-center rounded-lg transition-all duration-300 ease-in-out group ${
            isActive("/dashboard")
              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/30 shadow-lg backdrop-blur-sm"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 border border-transparent"
          }`}
        >
          <div
            className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
              isActive("/dashboard")
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="font-medium">Dashboard</span>
          {isActive("/dashboard") && (
            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>

        <Link
          to="/customer"
          className={`mb-2 px-4 py-3 flex items-center rounded-lg transition-all duration-300 ease-in-out group ${
            isActive("/customer")
              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/30 shadow-lg backdrop-blur-sm"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 border border-transparent"
          }`}
        >
          <div
            className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
              isActive("/customer")
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span className="font-medium">Customers</span>
          {isActive("/customer") && (
            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>

        <Link
          to="/bills"
          className={`mb-2 px-4 py-3 flex items-center rounded-lg transition-all duration-300 ease-in-out group ${
            isActive("/bills")
              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/30 shadow-lg backdrop-blur-sm"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 border border-transparent"
          }`}
        >
          <div
            className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
              isActive("/bills")
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="font-medium">Bills</span>
          {isActive("/bills") && (
            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>

        <Link
          to="/books"
          className={`mb-2 px-4 py-3 flex items-center rounded-lg transition-all duration-300 ease-in-out group ${
            isActive("/books")
              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/30 shadow-lg backdrop-blur-sm"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 border border-transparent"
          }`}
        >
          <div
            className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
              isActive("/books")
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <span className="font-medium">Books</span>
          {isActive("/books") && (
            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>

        <Link
          to="/help"
          className={`mb-2 px-4 py-3 flex items-center rounded-lg transition-all duration-300 ease-in-out group ${
            isActive("/help")
              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/30 shadow-lg backdrop-blur-sm"
              : "text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 border border-transparent"
          }`}
        >
          <div
            className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
              isActive("/help")
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 group-hover:bg-gray-700/50 group-hover:text-gray-300"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="font-medium">Help</span>
          {isActive("/help") && (
            <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </Link>
      </nav>

      {/* Footer section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
          <p className="text-xs text-gray-400 text-center">Admin Panel</p>
          <p className="text-xs text-blue-400 text-center font-medium">
            v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
