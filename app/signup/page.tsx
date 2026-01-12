"use client"

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link"

export default function Signup() {

  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const handleSubmit = async () => {
    const {error} = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,   
    });

    if (error) {
    alert('Sign up failed: ' + error.message);
  } else {
    window.location.href = '/login';  // Redirect to main page
  }}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt4">
            Already have an account? {""}
            <Link href="/login" className="text-blue-600 hover:underline">
                Login
            </Link>
        </p>
      </div>
    </div>
  </div>
);


};



