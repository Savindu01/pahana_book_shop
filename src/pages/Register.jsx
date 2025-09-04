import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    userPassword: "",
    confirmPassword: "",
    userEmail: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.userName || !formData.userEmail || !formData.userPassword) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all required fields",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#e2e8f0",
        customClass: {
          title: "text-red-400 font-semibold text-xl",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
        },
        buttonsStyling: false,
      });
      setIsLoading(false);
      return;
    }

    if (formData.userPassword !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#e2e8f0",
        customClass: {
          title: "text-red-400 font-semibold text-xl",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
        },
        buttonsStyling: false,
      });
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      Swal.fire({
        title: "Error!",
        text: "Please agree to the terms and conditions",
        icon: "error",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#e2e8f0",
        customClass: {
          title: "text-red-400 font-semibold text-xl",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
        },
        buttonsStyling: false,
      });
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for API - exactly matching your working example
      const apiData = {
        userName: formData.userName,
        userPassword: formData.userPassword,
        role: "admin",
        userEmail: formData.userEmail,
      };

      console.log("Sending registration data:", apiData);

      // Fixed API endpoint - corrected to /regiter as per your working example
      const response = await fetch(
        "http://localhost:8080/api/v1/user/regiter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const responseText = await response.text();
        console.log("Registration response:", responseText);
        
        // Check if response is "saved" (as per your API)
        if (responseText === "saved") {
          Swal.fire({
            title: "Success!",
            text: "Admin account created successfully! Welcome to Pahana Bookshop!",
            icon: "success",
            confirmButtonText: "Continue to Login",
            background: "#1e293b",
            color: "#e2e8f0",
            customClass: {
              title: "text-green-400 font-semibold text-xl",
              confirmButton:
                "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
            },
            buttonsStyling: false,
          }).then(() => {
            navigate("/");
          });
        } else {
          // Unexpected response format
          Swal.fire({
            title: "Unexpected Response!",
            text: `Server returned: ${responseText}`,
            icon: "warning",
            confirmButtonText: "OK",
            background: "#1e293b",
            color: "#e2e8f0",
            customClass: {
              title: "text-yellow-400 font-semibold text-xl",
              confirmButton:
                "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
            },
            buttonsStyling: false,
          });
        }
      } else {
        // Handle HTTP error statuses
        const errorText = await response.text().catch(() => "Unknown error occurred");
        console.error("Registration failed:", response.status, errorText);
        
        Swal.fire({
          title: "Registration Failed!",
          text: `Error ${response.status}: ${errorText || "Server error occurred"}`,
          icon: "error",
          confirmButtonText: "Try Again",
          background: "#1e293b",
          color: "#e2e8f0",
          customClass: {
            title: "text-red-400 font-semibold text-xl",
            confirmButton:
              "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      // Handle network/connection errors
      console.error("Network error during registration:", error);
      Swal.fire({
        title: "Connection Error!",
        text: "Unable to connect to the server. Please check if the server is running on localhost:8080 and try again.",
        icon: "error",
        confirmButtonText: "Retry",
        background: "#1e293b",
        color: "#e2e8f0",
        customClass: {
          title: "text-red-400 font-semibold text-xl",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm",
        },
        buttonsStyling: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="text-blue-400">PAHANA</span>{" "}
            <span className="text-slate-300">BOOKSHOP</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium mb-2">
            Create Admin Account
          </p>
          <p className="text-slate-500 text-sm">
            Register as an administrator for the bookshop
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="username"
                required
                value={formData.userName}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                autoComplete="email"
                required
                value={formData.userEmail}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter admin email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.userPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Create admin password"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-white placeholder-slate-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Confirm admin password"
              />
            </div>
          </div>

          {/* Role Display - Fixed as Admin */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value="Administrator"
                disabled
                className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-600 text-slate-300 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All new registrations are created with administrator privileges
            </p>
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-slate-300"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Terms and Conditions
              </a>{" "}
              and understand I will have administrator privileges
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Admin Account...
                </>
              ) : (
                "Create Admin Account"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-blue-400 hover:text-blue-300 transition duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;