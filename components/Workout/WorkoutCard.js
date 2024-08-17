"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { Button, Input, Select, LoadingSpinner } from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function WorkoutCard({ workout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState({ ...workout });
  const [isLoading, setIsLoading] = useState(false);

  const { updateWorkout, deleteWorkout } = useStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingWorkout({ ...workout });
  };

  const handleChange = (e) => {
    setEditingWorkout({ ...editingWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateWorkout(editingWorkout);
      toast.success("Workout updated successfully.");
      setIsEditing(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete this workout from ${formatDate(
          workout.date
        )}?`
      )
    ) {
      setIsLoading(true);
      try {
        await deleteWorkout(workout.id);
        toast.success("Workout deleted successfully.");
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
      <h3 className="text-lg font-bold mb-2">
        {formatDate(editingWorkout.date)}
      </h3>
      <p className="text-gray-600 mb-2">Type: {editingWorkout.type}</p>
      <p className="text-gray-600 mb-2">
        Duration: {editingWorkout.duration} minutes
      </p>
      <p className="text-gray-600 mb-2">
        Intensity: {editingWorkout.intensity}
      </p>
      {editingWorkout.type === "Strength Training" && (
        <p className="text-gray-600 mb-2">
          Weight: {editingWorkout.weight} kg
        </p>
      )}
      <p className="text-gray-600 mb-2">
        Calories Burned: {editingWorkout.caloriesBurned}
      </p>
      <p className="text-gray-600 mb-2">Notes: {editingWorkout.notes}</p>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="date"
            name="date"
            value={editingWorkout.date}
            onChange={handleChange}
          />
          <Select
            name="type"
            value={editingWorkout.type}
            onChange={handleChange}
          >
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
          </Select>
          <Input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={editingWorkout.duration}
            onChange={handleChange}
          />
          <Select
            name="intensity"
            value={editingWorkout.intensity}
            onChange={handleChange}
          >
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </Select>
          {editingWorkout.type === "Strength Training" && (
            <Input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={editingWorkout.weight}
              onChange={handleChange}
            />
          )}
          <Input
            type="number"
            name="caloriesBurned"
            placeholder="Calories Burned"
            value={editingWorkout.caloriesBurned}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="notes"
            placeholder="Notes"
            value={editingWorkout.notes}
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