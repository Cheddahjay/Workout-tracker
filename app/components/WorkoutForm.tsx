"use client";

import { useState } from "react";

// Define what an Exercise looks like
export interface Exercise {
  name: string;
  notes?: string; // Optional - the ? means it can be undefined
}

// Define what props this component expects from its parent
export interface WorkoutFormProps {
  onSubmitWorkout: (
    exercises: Exercise[],
    sessionNotes: string,
    isGoalAligned: boolean
  ) => void; // void means this function doesn't return anything
}






export default function WorkoutForm({ onSubmitWorkout }: WorkoutFormProps) {
  // State to track form inputs
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseNotes, setExerciseNotes] = useState('');
  const [sessionNotes, setSessionNotes] = useState(''); 
  const [isGoalAligned, setIsGoalAligned] = useState(false);

  // Function that runs when user clicks "Log Workout"
  const handleSubmit = () => {
    // Validation: Don't allow empty exercise name
    if (exerciseName.trim() === '') {
      alert('Please enter an exercise name');
      return;
    }

    // Create an Exercise object from the form data
    const exercise: Exercise = {
      name: exerciseName,
      notes: exerciseNotes || undefined // Only include notes if they exist
    };

    // Call the parent's function with the data
    onSubmitWorkout([exercise], sessionNotes, isGoalAligned);

    // Reset form to empty state
    setExerciseName('');
    setExerciseNotes('');
    setSessionNotes('');
    setIsGoalAligned(false);
  };





return (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4 text-gray-900">Log Workout</h2>

    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      
      {/* Exercise Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Exercise Name</label>
        <input 
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="e.g. Squats"
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>

      {/* Exercise Notes Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Exercise Notes (Optional)</label>
        <input 
          type="text" 
          value={exerciseNotes}
          onChange={(e) => setExerciseNotes(e.target.value)}
          placeholder="e.g. Deadlifts felt powerful today"
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>

      {/* Session Notes Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Session Notes</label>
        <textarea
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          placeholder="How did the workout feel overall?"
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
          rows={3}
        />
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
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
      >
        Log Workout
      </button>
      
    </form>
  </div>
);
}