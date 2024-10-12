import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaSpinner } from "react-icons/fa"; // Import loading icon

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    areaOfInterest: "",
    yearOfCampus: "",
    campusName: "",
    githubLink: "",
    linkedinProfile: "",
    portfolioLink: "",
    cv: null,
    universityDocument: null,
  });

  const [showEducation, setShowEducation] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(09|07)\d{8}$/; // Regex to check for 09 or 07 followed by 8 digits
    return phonePattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailPattern.test(email);
  };

  const validateLinkedIn = (linkedin) => {
    const linkedinPattern = /^(https?:\/\/)?(www\.)?(linkedin\.com\/in\/[A-Za-z0-9_-]+\/?)/; // Basic LinkedIn URL regex
    return linkedinPattern.test(linkedin);
  };

  const validateGitHub = (github) => {
    const githubPattern = /^(https?:\/\/)?(www\.)?(github\.com\/[A-Za-z0-9_-]+\/?)/; // Basic GitHub URL regex
    return githubPattern.test(github);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    
    // Validate all fields
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("Phone number must start with 09 or 07 and be exactly 10 digits long.");
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    if (formData.linkedinProfile && !validateLinkedIn(formData.linkedinProfile)) {
      setError("Please enter a valid LinkedIn profile URL.");
      return;
    }
    
    if (formData.githubLink && !validateGitHub(formData.githubLink)) {
      setError("Please enter a valid GitHub profile URL.");
      return;
    }

    setLoading(true); // Set loading state
    // Simulate form submission logic (e.g., API call)
    setTimeout(() => {
      console.log(formData);
      setLoading(false); // Reset loading state
      // Here you can add code to reset the form or navigate to another page
    }, 2000); // Simulate a delay for demonstration
  };

  return (
    <div className="flex max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-lg transition-all duration-300">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <img
          src="https://yt3.googleusercontent.com/aTFk_KLA9ElijmSDxAWROY3wKO8ryOPxjiA1c4kYY0e1eWtCHMFnfhO_qkkDPEaveaPCVMQzeQ=s900-c-k-c0x00ffffff-no-rj"
          alt="Logo"
          className="w-10 h-auto rounded-lg shadow-lg mb-4"
        />
      </div>

      {/* Form Section */}
      <div className="flex-grow">
        {!showEducation ? (
          <>
            <h2 className="text-3xl font-bold text-center text-golden mb-4">
              Student Registration
            </h2>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowEducation(true)}
                className="bg-golden text-white rounded px-4 py-2 mt-4 flex items-center transition duration-200 ease-in-out hover:bg-yellow-300"
              >
                Next <FaArrowRight className="ml-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-golden mb-4">
              Student Registration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Display error message if any */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Full Name */}
              <div>
                <label className="block font-medium mb-1 text-golden" htmlFor="fullName">
                  Full Name (required)
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-golden rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1 text-golden" htmlFor="email">
                  Email (required)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-golden rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium mb-1 text-golden" htmlFor="password">
                  Telegram Username (required)
                </label>
                <input
                  type="text"
                  id="telegramUsername"
                  name="telegramUsername"
                  required
                  value={formData.telegramUsername}
                  onChange={handleChange}
                  className="w-full p-2 border border-golden rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out"
                  placeholder="Enter your Telegram username"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-medium mb-1 text-golden" htmlFor="phoneNumber">
                  Phone Number (required)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-golden rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block font-medium mb-1 text-golden" htmlFor="areaOfInterest">
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  className="w-full p-2 border border-golden rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 ease-in-out"
                >
                  <option value="">Select your area of interest</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-golden text-white rounded px-4 py-2 mt-4 flex items-center transition duration-200 ease-in-out hover:bg-yellow-300"
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

              {/* Back Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEducation(false)}
                  className="text-golden flex items-center transition duration-200 ease-in-out hover:text-yellow-300"
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
