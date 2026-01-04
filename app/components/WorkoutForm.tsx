"use client";

import {useState} from "react";

interface WorkoutFormProps {
    goal:string,
    
    
}

export  default function workoutForm({}: WorkoutFormProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Log workout</h2>
        </div>


    )
}