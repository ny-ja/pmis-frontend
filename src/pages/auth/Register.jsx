import React, { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await registerUser(name, email, password);
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (err) {
      setError(
        "The email you entered is already taken. Please use a different email."
      );
      console.error("Error details:", err.response || err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="block text-gray-800 text-lg font-bold mb-4 text-center">
            Register
          </h2>
          {error && (
            <p className="text-red-500 text-xs italic mb-4 text-center">
              {error}
            </p>
          )}
          <div className="mb-4 flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <input
              className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaLock className="text-gray-500 mr-2" />
            <input
              className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <FaLock className="text-gray-500 mr-2" />
            <input
              className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 mr-8 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              type="submit"
            >
              Register
            </button>
            <a
              href="#login"
              onClick={() => navigate("/login")}
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
