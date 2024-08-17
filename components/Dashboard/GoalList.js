"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { Table, TableHeader, TableRow, TableCell } from "@/components/Shared";

export default function GoalList() {
  const [goals, setGoals] = useState([]);
  const allGoals = useStore((state) => state.goals);

  useEffect(() => {
    setGoals(allGoals);
  }, [allGoals]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Goal</TableCell>
            <TableCell>Target</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>{goal.name}</TableCell>
              <TableCell>{goal.target}</TableCell>
              <TableCell>
                {/* Calculate and display progress */}
              </TableCell>
              <TableCell>{goal.deadline}</TableCell>
              <TableCell>
                {/* Add buttons for editing and deleting goals */}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}