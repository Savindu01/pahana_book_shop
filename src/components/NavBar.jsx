import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from Pahana Book Shop",
      icon: "question",
      iconColor: "#3b82f6",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f3f4f6",
      customClass: {
        title: "text-white font-serif font-bold text-xl",
        text: "text-gray-300",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
        cancelButton:
          "bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          iconColor: "#10b981",
          confirmButtonColor: "#10b981",
          confirmButtonText: "OK",
          background: "#1f2937",
          color: "#f3f4f6",
          customClass: {
            title: "text-green-400 font-serif font-bold text-xl",
            text: "text-gray-300",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
          },
          buttonsStyling: false,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 shadow-2xl border-b border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          
          {/* Left side - Logo and Bookshop Name */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm p-2 rounded-lg border border-blue-400/30">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PAHANA
                </span>
                <span className="text-gray-300 font-light ml-2">BOOKSHOP</span>
              </span>
            </div>
          </div>

          {/* Right side - User info and Logout */}
          <div className="flex items-center space-x-4">
            
            {/* User Avatar/Info */}
            

            {/* Divider */}
            <div className="h-8 w-px bg-gray-600/50"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-gray-600/50 hover:to-gray-700/50 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center group"
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </nav>
  );
}

export default NavBar;