"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import {
  Button,
  Input,
  Select,
  LoadingSpinner,
  UserCard,
  WorkoutCard,
  GoalCard,
} from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { getUser, updateUser, followUser, unfollowUser } = useStore();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const fetchedUser = await getUser(session.user.id);
      setUser(fetchedUser);
      setEditingUser(fetchedUser);
      const isFollowing = session.user.following.includes(fetchedUser.id);
      setIsFollowing(isFollowing);
    } catch (error) {
      toast.error("An error occurred while fetching user data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingUser(user);
  };

  const handleChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUser(editingUser);
      toast.success("User profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error("An error occurred while updating user data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await followUser(user.id);
      toast.success(`You are now following ${user.name}.`);
      setIsFollowing(true);
    } catch (error) {
      toast.error("An error occurred while following the user.");
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
      toast.error("An error occurred while unfollowing the user.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={editingUser.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={handleChange}
            disabled
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Save"}
          </Button>
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex gap-4 mb-4">
          <Button type="button" onClick={handleEdit} variant="primary">
            Edit Profile
          </Button>
          {session?.user.id !== user.id && (
            <Button
              type="button"
              onClick={isFollowing ? handleUnfollow : handleFollow}
              variant={isFollowing ? "secondary" : "primary"}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">About</h2>
          <p className="text-gray-600">{user.bio || "No bio available."}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Workouts</h2>
          <div className="flex flex-col gap-2">
            {user.workouts.length > 0 ? (
              user.workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <p className="text-gray-500">No workouts logged yet.</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Goals</h2>
        <div className="flex flex-col gap-2">
          {user.goals.length > 0 ? (
            user.goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          ) : (
            <p className="text-gray-500">No goals set yet.</p>
          )}
        </div>
      </div>

      {/* You can add more sections here, such as a user's following list */}
    </div>
  );
}