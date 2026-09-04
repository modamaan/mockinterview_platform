import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl text-blue-600">Dashboard</h1>
          <p className="text-gray-600">
            Create and start your AI Mockup Interview
          </p>
        </div>
        <UserButton />
      </header>

      <main>
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="font-semibold text-xl mb-4">Start a New Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AddNewInterview />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-semibold text-xl mb-4">Your Interviews</h2>
          <InterviewList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;