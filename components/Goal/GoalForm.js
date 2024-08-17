"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { Input, Button, Select, LoadingSpinner } from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function GoalForm({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "weightLoss",
    target: "",
    deadline: "",
  });

  const { addGoal } = useStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addGoal(formData);
      toast.success("Goal added successfully.");
      closeModal();
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Add Goal</h2>

      <Input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
      />

      <Select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="weightLoss">Weight Loss</option>
        <option value="muscleGain">Muscle Gain</option>
        <option value="runningDistance">Running Distance</option>
        <option value="calorieIntake">Calorie Intake</option>
      </Select>

      <Input
        type="number"
        name="target"
        placeholder="Target"
        value={formData.target}
        onChange={handleChange}
      />

      <Input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Add Goal"}
      </Button>
    </form>
  );
}