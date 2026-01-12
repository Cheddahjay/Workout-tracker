"use client";

import { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import { Exercise } from "./components/WorkoutForm";
import WorkoutHistory from "./components/WorkoutHistory";
import { supabase } from "@/lib/supabase";

// Updated interface to match database structure
export interface WorkoutEntry {
  id: number;
  user_id?: string;
  exercise_notes: string;
  is_goal_aligned: boolean;
  timestamp: string;
  created_at?: string;
}

export default function Home() {
useEffect(() => {
  // Check if user is logged in
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Not logged in - redirect to login
      window.location.href = '/login';
    }
  };
  
  checkUser();
}, []);

  // State
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [goal, setGoal] = useState<string>('');

  // Load workouts from Supabase when component mounts
  useEffect(() => {
    loadWorkouts();
  }, []);

  // Fetch workouts from database
  async function loadWorkouts() {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading workouts:', error);
      return;
    }

    setWorkouts(data || []);
  }

const handleAddWorkout = async (
  exercises: Exercise[],
  sessionNotes: string,
  isGoalAligned: boolean
) => {
  console.log('Adding workout with:', { exercises, sessionNotes, isGoalAligned });

  const { data, error } = await supabase
    .from('workouts')
    .insert({
      exercise_notes: exercises[0]?.notes || '',
      is_goal_aligned: isGoalAligned,
    })
    .select()
    .single();

  console.log('Supabase response:', { data, error });

  if (error) {
    console.error('Error adding workout:', error);
    return;
  }

  if (data) {
    console.log('Adding to local state:', data);
    setWorkouts([data, ...workouts]);
  }
};

  // Delete workout from database
  const handleDeleteWorkout = async (id: number) => {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting workout:', error);
      return;
    }

    // Update local state
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const handleLogout = async ()=> {
    const {error} = await supabase.auth.signOut()
    
    if (error){
      alert("Log out failed" + error.message)
    }
    else{
      window.location.href = '/login';
    }

  }

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-100">⭐ Northern Star</h1>
        <button 
        onClick={handleLogout}
          style={{ backgroundColor: '#dc2626' }}
          className="text-white p-3 rounded"
        >
          Log out
        </button>
      </div>
      

      
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