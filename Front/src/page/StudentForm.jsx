import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import logo from '../assets/d.jpg';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegramUsername: "",
    phoneNumber: "",
    yearOfCampus: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(09|07)\d{8}$/; // Validates phone numbers starting with 09 or 07
    return phonePattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate fields
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("Phone number must start with 09 or 07 and be exactly 10 digits long.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log(formData);
      setLoading(false);
      setSuccess("Registration successful!");
      setFormData({
        fullName: "",
        email: "",
        telegramUsername: "",
        phoneNumber: "",
        yearOfCampus: "",
      });
    }, 2000);
  };

  return (
    <div className="flex max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-b from-blue-800 to-gray-200 rounded-lg shadow-lg transition-all duration-300">
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="w-10 h-auto rounded-lg shadow-lg mb-4" />
      </div>

      <div className="flex-grow">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Techtonic Registration
        </h2>

        {success && <p className="text-green-500 text-center">{success}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-blue-900" htmlFor="fullName">
              Full Name (required)
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-900" htmlFor="email">
              Email (required)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-900" htmlFor="telegramUsername">
              Telegram Username (required)
            </label>
            <input
              type="text"
              id="telegramUsername"
              name="telegramUsername"
              required
              value={formData.telegramUsername}
              onChange={handleChange}
              className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
              placeholder="Enter your Telegram username"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-900" htmlFor="phoneNumber">
              Phone Number (required)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-900" htmlFor="yearOfCampus">
              Year of Campus (required)
            </label>
            <select
              id="yearOfCampus"
              name="yearOfCampus"
              required
              value={formData.yearOfCampus}
              onChange={handleChange}
              className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <option value="" disabled>Select your year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white rounded px-6 py-3 transition duration-200 ease-in-out hover:bg-blue-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
