"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { Table, TableHeader, TableRow, TableCell } from "@/components/Shared";
import { LoadingSpinner } from "@/components/Shared";
import GoalForm from "@/components/Goal/GoalForm";
import GoalCard from "@/components/Goal/GoalCard";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const { getGoals, addGoal, updateGoal, deleteGoal } = useStore();
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      fetchGoals();
    }
  }, [currentUser]);

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const fetchedGoals = await getGoals(currentUser.id);
      setGoals(fetchedGoals);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGoal = () => {
    setIsAddingGoal(true);
  };

  const handleCloseModal = () => {
    setIsAddingGoal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Goals</h1>

      <div className="flex justify-between items-center mb-4">
        <Button type="button" onClick={handleAddGoal} variant="primary">
          Add Goal
        </Button>
      </div>

      {isAddingGoal && <GoalForm closeModal={handleCloseModal} />}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
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
              <GoalCard
                key={goal.id}
                goal={goal}
                updateGoal={updateGoal}
                deleteGoal={deleteGoal}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}