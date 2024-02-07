import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBonuses, deleteBonus } from "../../services/api";
import Header from "../../components/Header";

const BonusesIndex = () => {
  const [bonuses, setBonuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBonuses();
  }, []);

  const loadBonuses = () => {
    const token = localStorage.getItem("token");
    fetchBonuses(token)
      .then((response) => {
        setBonuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bonuses:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/bonuses/create");
  };

  const handleDelete = async (bonusId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this bonus?")) {
      await deleteBonus(bonusId, token);
      loadBonuses();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bonuses List</h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Bonus
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Bonus Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Bonus Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bonuses.map((bonus) => (
              <tr key={bonus.id} className="border-b">
                <td className="px-4 py-2">{`${
                  bonus.employee?.firstName || "NA"
                } ${bonus.employee?.lastName || "NA"}`}</td>
                <td className="px-4 py-2">{bonus.bonusType}</td>
                <td className="px-4 py-2">{bonus.amount}</td>
                <td className="px-4 py-2">
                  {new Date(bonus.bonusDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/bonuses/update/${bonus.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bonus.id)}
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

export default BonusesIndex;
