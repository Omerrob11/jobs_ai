import React, { useState } from "react";
import { authService } from "../../../services/auth/authService";
const SignUp = () => {
  // Form state - holds the values of our form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Status state - for showing success/error messages
  const [status, setStatus] = useState({
    message: "",
    isError: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any existing status messages
    setStatus({ message: "", isError: false });

    try {
      // Call the signup service
      const response = await authService.signup(formData);

      // Show success message
      setStatus({
        message: "ההרשמה בוצעה בהצלחה!",
        isError: false,
      });

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      // Show error message
      setStatus({
        message: error.message,
        isError: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">צור חשבון חדש</h2>
          <p className="mt-2 text-sm text-gray-600">
            הירשם כדי להתחיל להשתמש במערכת
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              שם משתמש
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              אימייל
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              סיסמה
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Message */}
          {status.message && (
            <div
              className={`p-4 rounded-md ${
                status.isError
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              הרשמה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
