"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  // State
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  // Handle form submission
const handleSubmit = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });
  
  if (error) {
    alert('Login failed: ' + error.message);
  } else {
    window.location.href = '/';  // Redirect to main page
  }
};
  // Display UI
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login Page</h2>

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
            Log In
          </button>

          <p className="text-center text-sm text-gray-600 mt4">
            Don't have an account yet ? {" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}