import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBonus, fetchEmployees } from "../../services/api";
import Header from "../../components/Header";

const CreateBonus = () => {
  const [bonusData, setBonusData] = useState({
    employeeID: "",
    bonusType: "",
    amount: "",
    bonusDate: "",
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchEmployees(token)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createBonus(bonusData, token);
      navigate("/bonuses");
    } catch (err) {
      console.error("Error creating bonus:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setBonusData({ ...bonusData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Bonus</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="employeeID"
            >
              Employee:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeID"
              name="employeeID"
              value={bonusData.employeeID}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >{`${employee.firstName} ${employee.lastName}`}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bonusType"
            >
              Bonus Type:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bonusType"
              type="text"
              name="bonusType"
              value={bonusData.bonusType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              name="amount"
              value={bonusData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bonusDate"
            >
              Bonus Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bonusDate"
              type="date"
              name="bonusDate"
              value={bonusData.bonusDate}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Bonus
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBonus;
