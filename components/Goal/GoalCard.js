"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { Button, Input, Select, LoadingSpinner } from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function GoalCard({ goal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState({ ...goal });
  const [isLoading, setIsLoading] = useState(false);

  const { updateGoal, deleteGoal } = useStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingGoal({ ...goal });
  };

  const handleChange = (e) => {
    setEditingGoal({ ...editingGoal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateGoal(editingGoal);
      toast.success("Goal updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this goal: ${goal.name}?`)) {
      setIsLoading(true);
      try {
        await deleteGoal(goal.id);
        toast.success("Goal deleted successfully.");
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{goal.name}</h3>
      <p className="text-gray-600 mb-2">
        Target: {editingGoal.target}
      </p>
      <p className="text-gray-600 mb-2">
        Deadline: {formatDate(editingGoal.deadline)}
      </p>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Goal Name"
            value={editingGoal.name}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="target"
            placeholder="Target"
            value={editingGoal.target}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="deadline"
            value={editingGoal.deadline}
            onChange={handleChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Save"}
          </Button>
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Progress: </p>
          <div className="flex gap-2">
            <Button type="button" onClick={handleEdit} variant="primary">
              Edit
            </Button>
            <Button type="button" onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}