import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../../services/api";
import Header from "../../components/Header";

const CreateDepartment = () => {
  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createDepartment(departmentData, token);
      navigate("/departments");
    } catch (err) {
      console.error("Error creating department:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create Department
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="departmentName"
            >
              Department Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="departmentName"
              type="text"
              name="departmentName"
              value={departmentData.departmentName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={departmentData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartment;
