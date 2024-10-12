import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaSpinner } from "react-icons/fa";
import logo from '../assets/d.jpg';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telegramUsername: "",
    phoneNumber: "",
    yearOfCampus: "",
  });

  const [showEducation, setShowEducation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-auto rounded-lg shadow-lg mb-4"
        />
      </div>

      <div className="flex-grow">
        {!showEducation ? (
          <>
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
              Student Registration
            </h2>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowEducation(true)}
                className="bg-blue-600 text-white rounded px-4 py-2 mt-4 flex items-center transition duration-200 ease-in-out hover:bg-blue-700"
              >
                Next <FaArrowRight className="ml-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
              Student Registration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}

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
                  Year of Campus
                </label>
                <select
                  id="yearOfCampus"
                  name="yearOfCampus"
                  value={formData.yearOfCampus}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                >
                  <option value="">Select Year</option>
                  <option value="1st year">1st year</option>
                  <option value="2nd year">2nd year</option>
                  <option value="3rd year">3rd year</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 mt-4 flex items-center transition duration-200 ease-in-out hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Submitting...
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEducation(false)}
                  className="text-blue-600 flex items-center transition duration-200 ease-in-out hover:text-blue-700"
                >
                  <FaArrowLeft className="mr-1" /> Back
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
