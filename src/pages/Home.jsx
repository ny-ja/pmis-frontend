import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Payroll Management And Information System Dashboard
        </h1>
      </div>
    </div>
  );
};

export default Home;
