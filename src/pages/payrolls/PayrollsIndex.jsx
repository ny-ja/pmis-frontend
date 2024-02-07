import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPayrolls, deletePayroll } from "../../services/api";
import Header from "../../components/Header";

const PayrollsIndex = () => {
  const [payrolls, setPayrolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = () => {
    const token = localStorage.getItem("token");
    fetchPayrolls(token)
      .then((response) => {
        setPayrolls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payrolls:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/payrolls/create");
  };

  const handleDelete = async (payrollId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this payroll record?")) {
      await deletePayroll(payrollId, token);
      loadPayrolls();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payrolls List</h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Payroll
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Period</th>
              <th className="px-4 py-2 text-left">Gross Salary</th>
              <th className="px-4 py-2 text-left">Net Salary</th>
              <th className="px-4 py-2 text-left">Pay Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {payrolls.map((payroll) => (
              <tr key={payroll.id} className="border-b">
                <td className="px-4 py-2">{`${payroll.employee?.firstName || "NA"} ${payroll.employee?.lastName || "NA"}`}</td>
                <td className="px-4 py-2">{`${new Date(payroll.periodStartDate).toLocaleDateString()} - ${new Date(payroll.periodEndDate).toLocaleDateString()}`}</td>
                <td className="px-4 py-2">{payroll.grossSalary}</td>
                <td className="px-4 py-2">{payroll.netSalary}</td>
                <td className="px-4 py-2">{new Date(payroll.payDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/payrolls/update/${payroll.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(payroll.id)}
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

export default PayrollsIndex;
