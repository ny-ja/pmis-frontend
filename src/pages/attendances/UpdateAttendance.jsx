import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAttendanceById,
  updateAttendance,
  fetchEmployees,
} from "../../services/api";
import Header from "../../components/Header";

const UpdateAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    employeeID: "",
    date: "",
    status: "",
  });
  const [employees, setEmployees] = useState([]);
  const { attendanceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchEmployees(token)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employees:", error));

    getAttendanceById(attendanceId, token)
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching attendance details:", error)
      );
  }, [attendanceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateAttendance(attendanceId, attendanceData, token);
      navigate("/attendances");
    } catch (err) {
      console.error("Error updating attendance:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Attendance
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="employeeId"
            >
              Employee:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeID"
              name="employeeID"
              value={attendanceData.employeeID}
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
              htmlFor="date"
            >
              Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              value={attendanceData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
              value={attendanceData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAttendance;
