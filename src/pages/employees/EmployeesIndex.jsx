import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../../services/api";
import Header from "../../components/Header";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const token = localStorage.getItem("token");
    fetchEmployees(token)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/employees/create");
  };

  const handleDelete = async (employeeId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(employeeId, token);
      loadEmployees();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Employees List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Employee
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="px-4 py-2">{`${employee.firstName} ${employee.lastName}`}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">
                  {employee.department?.departmentName || "N/A"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/employees/update/${employee.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
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

export default Employees;
