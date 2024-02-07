import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../services/api";
import Header from "../../components/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const token = localStorage.getItem("token");
    fetchUsers(token)
      .then((response) => {
        const nonAdminUsers = response.data.filter((user) => !user.isAdmin);
        setUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/users/create");
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId, token);
      loadUsers();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create User
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/users/update/${user.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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

export default Users;
