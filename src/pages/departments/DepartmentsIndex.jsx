import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, deleteDepartment } from "../../services/api";
import Header from "../../components/Header";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    const token = localStorage.getItem("token");
    fetchDepartments(token)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/departments/create");
  };

  const handleDelete = async (departmentId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(departmentId, token);
      loadDepartments();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Departments List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Department
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Department Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {departments.map((department) => (
              <tr key={department.id} className="border-b">
                <td className="px-4 py-2">{department.departmentName}</td>
                <td className="px-4 py-2">{department.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/departments/update/${department.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;
