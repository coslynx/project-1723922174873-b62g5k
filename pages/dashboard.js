"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { LoadingSpinner } from "@/components/Shared";
import GoalList from "@/components/Dashboard/GoalList";
import WorkoutLog from "@/components/Dashboard/WorkoutLog";
import ProgressChart from "@/components/Dashboard/ProgressChart";
import ActivityFeed from "@/components/Social/ActivityFeed";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <GoalList />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <WorkoutLog />
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <ProgressChart />
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <ActivityFeed />
      </div>
    </div>
  );
}