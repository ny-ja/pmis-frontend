import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import UsersIndex from "./pages/users/UsersIndex";
import CreateUser from "./pages/users/CreateUser";
import UpdateUser from "./pages/users/UpdateUser";
import DepartmentsIndex from "./pages/departments/DepartmentsIndex";
import CreateDepartment from "./pages/departments/CreateDepartment";
import UpdateDepartment from "./pages/departments/UpdateDepartment";
import EmployeesIndex from "./pages/employees/EmployeesIndex";
import CreateEmployee from "./pages/employees/CreateEmployee";
import UpdateEmployee from "./pages/employees/UpdateEmployee";
import PayrollsIndex from "./pages/payrolls/PayrollsIndex";
import CreatePayroll from "./pages/payrolls/CreatePayroll";
import UpdatePayroll from "./pages/payrolls/UpdatePayroll";
import DeductionsIndex from "./pages/deductions/DeductionsIndex";
import CreateDeduction from "./pages/deductions/CreateDeduction";
import UpdateDeduction from "./pages/deductions/UpdateDeduction";
import BonusesIndex from "./pages/bonuses/BonusesIndex";
import CreateBonus from "./pages/bonuses/CreateBonus";
import UpdateBonus from "./pages/bonuses/UpdateBonus";
import TaxesIndex from "./pages/taxes/TaxesIndex";
import CreateTax from "./pages/taxes/CreateTax";
import UpdateTax from "./pages/taxes/UpdateTax";
import AttendancesIndex from "./pages/attendances/AttendancesIndex";
import CreateAttendance from "./pages/attendances/CreateAttendance";
import UpdateAttendance from "./pages/attendances/UpdateAttendance";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<UsersIndex />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/update/:userId" element={<UpdateUser />} />
        <Route path="/departments" element={<DepartmentsIndex />} />
        <Route path="/departments/create" element={<CreateDepartment />} />
        <Route path="/departments/update/:departmentId" element={<UpdateDepartment />} />
        <Route path="/employees" element={<EmployeesIndex />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/update/:employeeId" element={<UpdateEmployee />} />
        <Route path="/payrolls" element={<PayrollsIndex />} />
        <Route path="/payrolls/create" element={<CreatePayroll />} />
        <Route path="/payrolls/update/:payrollId" element={<UpdatePayroll />} />
        <Route path="/deductions" element={<DeductionsIndex />} />
        <Route path="/deductions/create" element={<CreateDeduction />} />
        <Route path="/deductions/update/:deductionId" element={<UpdateDeduction />} />
        <Route path="/bonuses" element={<BonusesIndex />} />
        <Route path="/bonuses/create" element={<CreateBonus />} />
        <Route path="/bonuses/update/:bonusId" element={<UpdateBonus />} />
        <Route path="/taxes" element={<TaxesIndex />} />
        <Route path="/taxes/create" element={<CreateTax />} />
        <Route path="/taxes/update/:taxId" element={<UpdateTax />} />
        <Route path="/attendances" element={<AttendancesIndex />} />
        <Route path="/attendances/create" element={<CreateAttendance />} />
        <Route path="/attendances/update/:attendanceId" element={<UpdateAttendance />} />
      </Routes>
    </Router>
  );
};

export default App;
