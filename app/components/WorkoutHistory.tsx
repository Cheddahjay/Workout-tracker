"use client";

import { WorkoutEntry } from "../page";

export interface WorkoutHistoryProps {
  workouts: WorkoutEntry[];
  onDelete: (id: number) => void;
}

export default function WorkoutHistory({ workouts, onDelete }: WorkoutHistoryProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Completed Workouts</h2>

      {workouts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💪</div>
          <p className="text-gray-600 font-medium mb-2">No workouts yet</p>
          <p className="text-sm text-gray-500">Save you first work out, begin tracking your progress</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg"
            >
              {/* Header with timestamp, badge, and delete button */}
              <div className="flex justify-between items-start mb-3">
                {/* Left: Timestamp */}
                <span className="text-xs text-gray-500">
                  {new Date(workout.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>

                {/* Right: Badge and Delete Button grouped together */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    workout.is_goal_aligned
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {workout.is_goal_aligned ? '✓ Goal' : '✗ Off Track'}
                  </span>
                  
                  <button
                    onClick={() => onDelete(workout.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                    title="Delete workout"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Workout content */}
              <p className="text-gray-900 whitespace-pre-line">
               {workout.exercise_notes || 'No details'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}