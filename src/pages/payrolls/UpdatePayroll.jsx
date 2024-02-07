import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPayrollById, updatePayroll, fetchEmployees } from "../../services/api";
import Header from "../../components/Header";

const UpdatePayroll = () => {
  const [payrollData, setPayrollData] = useState({
    employeeID: "",
    periodStartDate: "",
    periodEndDate: "",
    grossSalary: "",
    netSalary: "",
    payDate: "",
  });
  const [employees, setEmployees] = useState([]);
  const { payrollId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchEmployees(token)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));

    getPayrollById(payrollId, token)
      .then((response) => {
        const { periodStartDate, periodEndDate, payDate, ...rest } = response.data;
        setPayrollData({
          ...rest,
          periodStartDate: periodStartDate.split('T')[0],
          periodEndDate: periodEndDate.split('T')[0],
          payDate: payDate.split('T')[0],
        });
      })
      .catch((error) => console.error("Error fetching payroll details:", error));
  }, [payrollId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updatePayroll(payrollId, payrollData, token);
      navigate("/payrolls");
    } catch (err) {
      console.error("Error updating payroll:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setPayrollData({ ...payrollData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Payroll</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">Employee:</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeID"
              name="employeeID"
              value={payrollData.employeeID}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="periodStartDate">Period Start Date:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="periodStartDate"
              type="date"
              name="periodStartDate"
              value={payrollData.periodStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="periodEndDate">Period End Date:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="periodEndDate"
              type="date"
              name="periodEndDate"
              value={payrollData.periodEndDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grossSalary">Gross Salary:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grossSalary"
              type="number"
              name="grossSalary"
              value={payrollData.grossSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="netSalary">Net Salary:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="netSalary"
              type="number"
              name="netSalary"
              value={payrollData.netSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payDate">Pay Date:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="payDate"
              type="date"
              name="payDate"
              value={payrollData.payDate}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Payroll
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePayroll;
