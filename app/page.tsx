"use client";


import { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import { Exercise } from "./components/WorkoutForm";
import WorkoutHistory from "./components/WorkoutHistory";
import { json } from "stream/consumers";

// Define the complete structure of a saved workout entry
export interface WorkoutEntry {
  id: number;
  timestamp: string;
  exercises: Exercise[];
  sessionNotes: string;
  isGoalAligned: boolean;
}

export default function Home() {
  // State: Array to hold all workout entries
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(() => {
    if (typeof window !== 'undefined'){
      const saved = localStorage.getItem('workouts')
      return saved? JSON.parse(saved) : [];
    }
    return [];
  }) 

  const [goal, setGoal] = useState<string>(() => {
    if(typeof window !== 'undefined'){
      return localStorage.getItem('goal') || '';
    }
    return '';
  })

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    localStorage.setItem('goal', JSON.stringify(goal));
  }, [workouts, goal]);
  

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
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleDeleteWorkout = (id:number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id))

  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">⭐ Northern Star</h1>
      
      {/* Goal Input */}
      <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-6 max-w-2xl">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What are you working towards? (Your 'Northern Star')
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., I will lose 20 lbs"
          className="w-full p-3 border border-blue-300 rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {goal && (
          <p className="text-xs text-gray-600 mt-2">
            💪 Working toward: <span className="font-semibold">{goal}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Form */}
        <div>
          <WorkoutForm onSubmitWorkout={handleAddWorkout} />
        </div>

        {/* Right Side - History */}
        <WorkoutHistory
         workouts={workouts} 
         onDelete={handleDeleteWorkout}
         />
      </div>
    </main>
  );
}