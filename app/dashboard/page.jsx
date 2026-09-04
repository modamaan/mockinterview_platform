import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-4xl text-blue-700">Dashboard</h1>
          <p className="text-gray-700 mt-2">
            Create and start your AI Mockup Interview
          </p>
        </div>
        <UserButton />
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
        <h2 className="font-semibold text-2xl text-gray-800 mb-6">
          Add New Interview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddNewInterview />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="font-semibold text-2xl text-gray-800 mb-6">
          Your Interviews
        </h2>
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;