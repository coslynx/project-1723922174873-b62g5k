"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { Table, TableHeader, TableRow, TableCell } from "@/components/Shared";
import { LoadingSpinner } from "@/components/Shared";
import WorkoutForm from "@/components/Workout/WorkoutForm";
import WorkoutCard from "@/components/Workout/WorkoutCard";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const { getWorkouts, addWorkout, updateWorkout, deleteWorkout } = useStore();
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      fetchWorkouts();
    }
  }, [currentUser]);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    try {
      const fetchedWorkouts = await getWorkouts(currentUser.id);
      setWorkouts(fetchedWorkouts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = () => {
    setIsAddingWorkout(true);
  };

  const handleCloseModal = () => {
    setIsAddingWorkout(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Workouts</h1>

      <div className="flex justify-between items-center mb-4">
        <Button type="button" onClick={handleAddWorkout} variant="primary">
          Add Workout
        </Button>
      </div>

      {isAddingWorkout && (
        <WorkoutForm closeModal={handleCloseModal} />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Intensity</TableCell>
              <TableCell>Weight (kg)</TableCell>
              <TableCell>Calories Burned</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                updateWorkout={updateWorkout}
                deleteWorkout={deleteWorkout}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}