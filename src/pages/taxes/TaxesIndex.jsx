import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTaxes, deleteTax } from "../../services/api";
import Header from "../../components/Header";

const TaxesIndex = () => {
  const [taxes, setTaxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTaxes();
  }, []);

  const loadTaxes = () => {
    const token = localStorage.getItem("token");
    fetchTaxes(token)
      .then((response) => {
        setTaxes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching taxes:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/taxes/create");
  };

  const handleDelete = async (taxId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this tax record?")) {
      await deleteTax(taxId, token);
      loadTaxes();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Taxes List</h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Tax
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Tax Type</th>
              <th className="px-4 py-2 text-left">Tax Rate</th>
              <th className="px-4 py-2 text-left">Tax Amount</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {taxes.map((tax) => (
              <tr key={tax.id} className="border-b">
                <td className="px-4 py-2">{`${
                  tax.employee?.firstName || "N/A"
                } ${tax.employee?.lastName || "N/A"}`}</td>
                <td className="px-4 py-2">{tax.taxType}</td>
                <td className="px-4 py-2">{`${tax.taxRate}%`}</td>
                <td className="px-4 py-2">{tax.taxAmount}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/taxes/update/${tax.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tax.id)}
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

export default TaxesIndex;
