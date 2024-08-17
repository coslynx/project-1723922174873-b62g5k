"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { Input, Button, Select, LoadingSpinner } from "@/components/Shared";
import { toast } from "react-hot-toast";

export default function WorkoutForm({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "Cardio",
    duration: "",
    intensity: "Moderate",
    weight: "",
    caloriesBurned: "",
    notes: "",
  });

  const { addWorkout } = useStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addWorkout(formData);
      toast.success("Workout added successfully.");
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
      <h2 className="text-2xl font-bold text-gray-800">Log Workout</h2>

      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <Select name="type" value={formData.type} onChange={handleChange}>
        <option value="Cardio">Cardio</option>
        <option value="Strength Training">Strength Training</option>
        <option value="Yoga">Yoga</option>
        <option value="Pilates">Pilates</option>
      </Select>

      <Input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
      />

      <Select
        name="intensity"
        value={formData.intensity}
        onChange={handleChange}
      >
        <option value="Light">Light</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
      </Select>

      {formData.type === "Strength Training" && (
        <Input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
        />
      )}

      <Input
        type="number"
        name="caloriesBurned"
        placeholder="Calories Burned"
        value={formData.caloriesBurned}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Log Workout"}
      </Button>
    </form>
  );
}