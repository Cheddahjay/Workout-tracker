"use client";

import { useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import { Exercise } from "./components/WorkoutForm";

// Define the complete structure of a saved workout entry
interface WorkoutEntry {
  id: number;
  timestamp: string;
  exercises: Exercise[];
  sessionNotes: string;
  isGoalAligned: boolean;
}

export default function Home() {
  // State: Array to hold all workout entries
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);

  // Function to add a new workout to the list
  const handleAddWorkout = (
    exercises: Exercise[],
    sessionNotes: string,
    isGoalAligned: boolean
  ) => {
    // Create a new workout object with auto-generated id and timestamp
    const newWorkout: WorkoutEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      exercises,
      sessionNotes,
      isGoalAligned,
    };

    // Add new workout to the existing array
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Workout Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div>
          <WorkoutForm onSubmitWorkout={handleAddWorkout} />
        </div>

        {/* Right Side - History Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Workout History</h2>
          <p className="text-gray-500">History will go here...</p>
        </div>
      </div>
    </main>
  );
}