import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header class="text-white body-font bg-gray-900">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <button class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="/pmis-logo.png" alt="PMIS Logo" className="mr-3 h-16" />
          <span class="ml-3 text-xl text-white">PMIS</span>
        </button>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <button
            onClick={() => navigate("/home")}
            class="mr-5 hover:text-cyan-600"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/users")}
            class="mr-5 hover:text-cyan-600"
          >
            Users
          </button>
          <button
            onClick={() => navigate("/departments")}
            class="mr-5 hover:text-cyan-600"
          >
            Departments
          </button>
          <button
            onClick={() => navigate("/employees")}
            class="mr-5 hover:text-cyan-600"
          >
            Employees
          </button>
          <button
            onClick={() => navigate("/payrolls")}
            class="mr-5 hover:text-cyan-600"
          >
            Payrolls
          </button>
          <button
            onClick={() => navigate("/deductions")}
            class="mr-5 hover:text-cyan-600"
          >
            Deductions
          </button>
          <button
            onClick={() => navigate("/bonuses")}
            class="mr-5 hover:text-cyan-600"
          >
            Bonuses
          </button>
          <button
            onClick={() => navigate("/taxes")}
            class="mr-5 hover:text-cyan-600"
          >
            Taxes
          </button>
          <button
            onClick={() => navigate("/attendances")}
            class="mr-5 hover:text-cyan-600"
          >
            Attendances
          </button>
        </nav>
        <button
          onClick={handleLogout}
          class="inline-flex items-center bg-red-700 border-0 py-1 px-3 focus:outline-none hover:bg-red-900 rounded text-base mt-4 md:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
