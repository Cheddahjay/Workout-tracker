"use client"

import { WorkoutEntry } from "../page"

export interface WorkoutHistoryProps{
    workouts: WorkoutEntry[]

}

export default function WorkoutHistory({workouts}: WorkoutHistoryProps){
    return(
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Workout History</h2>

            {workouts.length === 0 ? (
                <p className="text-gray-500 italic">No workouts logged yet. Start tracking!</p>
            ) : (
                <div className="space-y-4">
                    {workouts.map((workout) => (
                        <div
                           key={workout.id}
                           className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs text-gray-500">
                                    {new Date(workout.timestamp).toLocaleString('en-us',{
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>

                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                    workout.isGoalAligned
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                    {workout.isGoalAligned ? '✓ Goal' : '✗ Off Track'}

                                </span>
                            </div>
                            <p className="text-gray-900 whitespace-pre-line">
                                {workout.exercises[0]?.notes || 'No details'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}