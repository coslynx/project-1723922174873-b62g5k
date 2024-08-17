"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { Button, Input, Select, LoadingSpinner } from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { followUser, unfollowUser } = useStore();
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      const isFollowing = currentUser.following.includes(user.id);
      setIsFollowing(isFollowing);
    }
  }, [currentUser, user.id]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await followUser(user.id);
      toast.success(`You are now following ${user.name}.`);
      setIsFollowing(true);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      await unfollowUser(user.id);
      toast.success(`You have unfollowed ${user.name}.`);
      setIsFollowing(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{user.name}</h3>
      <p className="text-gray-600 mb-2">Joined: {formatDate(user.joinedDate)}</p>
      <p className="text-gray-600 mb-2">
        Total Workouts: {user.totalWorkouts}
      </p>
      <div className="flex justify-between items-center">
        {isFollowing ? (
          <Button type="button" onClick={handleUnfollow} variant="secondary">
            {isLoading ? <LoadingSpinner /> : "Unfollow"}
          </Button>
        ) : (
          <Button type="button" onClick={handleFollow} variant="primary">
            {isLoading ? <LoadingSpinner /> : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
}