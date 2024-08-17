"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { ActivityItem } from "@/components/Shared";
import { LoadingSpinner } from "@/components/Shared";

export default function ActivityFeed() {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      fetchActivity();
    }
  }, [currentUser]);

  const fetchActivity = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/social/feed");
      if (!response.ok) {
        throw new Error(`Error fetching activity: ${response.status}`);
      }
      const data = await response.json();
      setActivity(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {activity.map((item) => (
            <li key={item.id}>
              <ActivityItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}