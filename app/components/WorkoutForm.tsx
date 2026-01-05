"use client";

import { useState } from "react";

// Define what an Exercise looks like
export interface Exercise {
  name: string;
  notes?: string;
}

// Define what props this component expects from its parent
export interface WorkoutFormProps {
  onSubmitWorkout: (
    exercises: Exercise[],
    sessionNotes: string,
    isGoalAligned: boolean
  ) => void;
}

export default function WorkoutForm({ onSubmitWorkout }: WorkoutFormProps) {
  // Simplified state - just one text field
  const [workoutSummary, setWorkoutSummary] = useState('');
  const [isGoalAligned, setIsGoalAligned] = useState(false);

  const handleSubmit = () => {
    if (workoutSummary.trim() === '') {
      alert('Please enter your workout details');
      return;
    }
        const exercise: Exercise = {
      name: "Workout",
      notes: workoutSummary
    };

    onSubmitWorkout([exercise], "", isGoalAligned);

    // Reset form
    setWorkoutSummary('');
    setIsGoalAligned(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Log Workout</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        
        {/* Single Workout Summary Box */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            What did you do today?
          </label>
          <textarea
            value={workoutSummary}
            onChange={(e) => setWorkoutSummary(e.target.value)}
            placeholder="Squats 5x5 @ 225lbs&#10;Bench 3x8 @ 185lbs&#10;Deadlift 1x5 @ 405lbs - new PR!"
            className="w-full p-3 border border-gray-300 rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Just type your workout naturally - we'll organize it for you
          </p>
        </div>

        {/* Goal Alignment Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input 
              type="checkbox"
              checked={isGoalAligned}
              onChange={(e) => setIsGoalAligned(e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700">This workout aligned with my goal</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Log Workout
        </button>
        
      </form>
    </div>
  );
}

    // For now, we'll treat the whole summary as one "exercise