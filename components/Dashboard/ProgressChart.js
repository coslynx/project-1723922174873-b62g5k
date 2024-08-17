"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "@/store/store";
import { formatDate } from "@/utils/helpers";

export default function ProgressChart() {
  const [chartData, setChartData] = useState(null);
  const workouts = useStore((state) => state.workouts);

  useEffect(() => {
    if (workouts.length > 0) {
      const goals = useStore((state) => state.goals);
      const goal = goals.find((goal) => goal.type === "weightLoss");
      if (goal) {
        const weightData = workouts.map((workout) => ({
          date: formatDate(workout.date),
          weight: workout.weight,
        }));

        setChartData({
          labels: weightData.map((data) => data.date),
          datasets: [
            {
              label: "Weight (kg)",
              data: weightData.map((data) => data.weight),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
            {
              label: "Target Weight",
              data: weightData.map(() => goal.target),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderDash: [5, 5],
            },
          ],
        });
      }
    }
  }, [workouts]);

  if (!chartData) {
    return <p className="text-center text-gray-500">No data available yet.</p>;
  }

  return (
    <div className="w-full h-96 rounded-lg shadow-md">
      <Line data={chartData} options={{
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Weight (kg)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      }} />
    </div>
  );
}