import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const loginUser = (email, password) => {
  return axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const registerUser = (name, email, password, token) => {
  return axios.post(
    `${API_URL}/auth/register`,
    { name, email, password },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// User-related API functions
export const fetchUsers = (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData, token) => {
  return axios.post(`${API_URL}/users`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserById = (id, token) => {
  return axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (id, userData, token) => {
  return axios.put(`${API_URL}/users/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id, token) => {
  return axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Department-related API functions
export const fetchDepartments = (token) => {
  return axios.get(`${API_URL}/departments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDepartment = (departmentData, token) => {
  return axios.post(`${API_URL}/departments`, departmentData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDepartmentById = (id, token) => {
  return axios.get(`${API_URL}/departments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDepartment = (id, departmentData, token) => {
  return axios.put(`${API_URL}/departments/${id}`, departmentData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDepartment = (id, token) => {
  return axios.delete(`${API_URL}/departments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Employee-related API functions
export const fetchEmployees = (token) => {
  return axios.get(`${API_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createEmployee = (employeeData, token) => {
  return axios.post(`${API_URL}/employees`, employeeData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmployeeById = (id, token) => {
  return axios.get(`${API_URL}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateEmployee = (id, employeeData, token) => {
  return axios.put(`${API_URL}/employees/${id}`, employeeData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteEmployee = (id, token) => {
  return axios.delete(`${API_URL}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Payroll-related API functions
export const fetchPayrolls = (token) => {
  return axios.get(`${API_URL}/payrolls`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPayroll = (payrollData, token) => {
  return axios.post(`${API_URL}/payrolls`, payrollData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPayrollById = (id, token) => {
  return axios.get(`${API_URL}/payrolls/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePayroll = (id, payrollData, token) => {
  return axios.put(`${API_URL}/payrolls/${id}`, payrollData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePayroll = (id, token) => {
  return axios.delete(`${API_URL}/payrolls/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Deduction-related API functions
export const fetchDeductions = (token) => {
  return axios.get(`${API_URL}/deductions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDeduction = (deductionData, token) => {
  return axios.post(`${API_URL}/deductions`, deductionData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDeductionById = (id, token) => {
  return axios.get(`${API_URL}/deductions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDeduction = (id, deductionData, token) => {
  return axios.put(`${API_URL}/deductions/${id}`, deductionData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDeduction = (id, token) => {
  return axios.delete(`${API_URL}/deductions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Bonus-related API functions
export const fetchBonuses = (token) => {
  return axios.get(`${API_URL}/bonuses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBonus = (bonusData, token) => {
  return axios.post(`${API_URL}/bonuses`, bonusData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBonusById = (id, token) => {
  return axios.get(`${API_URL}/bonuses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBonus = (id, bonusData, token) => {
  return axios.put(`${API_URL}/bonuses/${id}`, bonusData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBonus = (id, token) => {
  return axios.delete(`${API_URL}/bonuses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Tax-related API functions
export const fetchTaxes = (token) => {
  return axios.get(`${API_URL}/taxes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTax = (taxData, token) => {
  return axios.post(`${API_URL}/taxes`, taxData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTaxById = (id, token) => {
  return axios.get(`${API_URL}/taxes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTax = (id, taxData, token) => {
  return axios.put(`${API_URL}/taxes/${id}`, taxData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTax = (id, token) => {
  return axios.delete(`${API_URL}/taxes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Attendance-related API functions
export const fetchAttendances = (token) => {
  return axios.get(`${API_URL}/attendances`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAttendance = (attendanceData, token) => {
  return axios.post(`${API_URL}/attendances`, attendanceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAttendanceById = (id, token) => {
  return axios.get(`${API_URL}/attendances/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAttendance = (id, attendanceData, token) => {
  return axios.put(`${API_URL}/attendances/${id}`, attendanceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAttendance = (id, token) => {
  return axios.delete(`${API_URL}/attendances/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
