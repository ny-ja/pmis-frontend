import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAttendances, deleteAttendance } from "../../services/api"; // Make sure to adjust API functions accordingly
import Header from "../../components/Header";

const AttendancesIndex = () => {
  const [attendances, setAttendances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAttendances();
  }, []);

  const loadAttendances = () => {
    const token = localStorage.getItem("token");
    fetchAttendances(token)
      .then((response) => {
        setAttendances(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendances:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/attendances/create");
  };

  const handleDelete = async (attendanceId) => {
    const token = localStorage.getItem("token");
    if (
      window.confirm("Are you sure you want to delete this attendance record?")
    ) {
      await deleteAttendance(attendanceId, token);
      loadAttendances();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Attendance List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Record Attendance
        </button>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {attendances.map((attendance) => (
              <tr key={attendance.id} className="border-b">
                <td className="px-4 py-2">
                  {new Date(attendance.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{`${attendance.employee.firstName} ${attendance.employee.lastName}`}</td>
                <td className="px-4 py-2">{attendance.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/attendances/update/${attendance.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(attendance.id)}
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

export default AttendancesIndex;
