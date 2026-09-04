import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl text-blue-600">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Create and start your AI Mockup Interview
          </p>
        </div>
        <UserButton />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-xl text-gray-700 mb-4">
          Add New Interview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AddNewInterview />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="font-semibold text-xl text-gray-700 mb-4">
          Your Interviews
        </h2>
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;