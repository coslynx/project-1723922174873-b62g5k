"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";
import { Table, TableHeader, TableRow, TableCell } from "@/components/Shared";

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);
  const allWorkouts = useStore((state) => state.workouts);

  useEffect(() => {
    setWorkouts(allWorkouts);
  }, [allWorkouts]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Workout Log</h2>
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
          </TableRow>
        </TableHeader>
        <tbody>
          {workouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell>{formatDate(workout.date)}</TableCell>
              <TableCell>{workout.type}</TableCell>
              <TableCell>{workout.duration}</TableCell>
              <TableCell>{workout.intensity}</TableCell>
              <TableCell>{workout.weight}</TableCell>
              <TableCell>{workout.caloriesBurned}</TableCell>
              <TableCell>{workout.notes}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}