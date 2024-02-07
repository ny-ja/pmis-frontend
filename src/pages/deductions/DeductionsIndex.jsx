import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeductions, deleteDeduction } from "../../services/api";
import Header from "../../components/Header";

const DeductionsIndex = () => {
  const [deductions, setDeductions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDeductions();
  }, []);

  const loadDeductions = () => {
    const token = localStorage.getItem("token");
    fetchDeductions(token)
      .then((response) => {
        setDeductions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching deductions:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/deductions/create");
  };

  const handleDelete = async (deductionId) => {
    const token = localStorage.getItem("token");
    if (
      window.confirm("Are you sure you want to delete this deduction record?")
    ) {
      await deleteDeduction(deductionId, token);
      loadDeductions();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Deductions List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Deduction
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Deduction Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Deduction Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {deductions.map((deduction) => (
              <tr key={deduction.id} className="border-b">
                <td className="px-4 py-2">{`${
                  deduction.employee?.firstName || "N/A"
                } ${deduction.employee?.lastName || "N/A"}`}</td>
                <td className="px-4 py-2">{deduction.deductionType}</td>
                <td className="px-4 py-2">{deduction.amount}</td>
                <td className="px-4 py-2">
                  {new Date(deduction.deductionDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/deductions/update/${deduction.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(deduction.id)}
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

export default DeductionsIndex;
