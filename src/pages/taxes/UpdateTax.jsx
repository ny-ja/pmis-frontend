import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaxById, updateTax, fetchEmployees } from "../../services/api";
import Header from "../../components/Header";

const UpdateTax = () => {
  const [taxData, setTaxData] = useState({
    employeeID: "",
    taxType: "",
    taxRate: "",
    taxAmount: "",
  });
  const [employees, setEmployees] = useState([]);
  const { taxId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchEmployees(token)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));

    getTaxById(taxId, token)
      .then((response) => {
        setTaxData(response.data);
      })
      .catch((error) => console.error("Error fetching tax details:", error));
  }, [taxId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateTax(taxId, taxData, token);
      navigate("/taxes");
    } catch (err) {
      console.error("Error updating tax:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Tax</h1>
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
              value={taxData.employeeID}
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
              htmlFor="taxType"
            >
              Tax Type:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taxType"
              type="text"
              name="taxType"
              value={taxData.taxType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taxRate"
            >
              Tax Rate (%):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taxRate"
              type="number"
              name="taxRate"
              value={taxData.taxRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taxAmount"
            >
              Tax Amount:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taxAmount"
              type="number"
              name="taxAmount"
              value={taxData.taxAmount}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Tax
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTax;
