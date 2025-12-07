'use client';

import { API_CALL } from '@/constant';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!email || !password) {
        setErrorMsg("Email and password are required!");
        setLoading(false);
        return;
      }

      const payload = { email, password };
      const res = await axios.post(`${API_CALL}/auth/login-user`, payload,{
        withCredentials:true
      });

      setSuccessMsg("Login successful!");
      console.log("User logged in:", res.data);

      // OPTIONAL: Save token
      // localStorage.setItem("token", res.data.token);

      // Navigate to dashboard
      router.push('/dashboard');

    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">Welcome Back</h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">Login to continue</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-50">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-50">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && <p className="text-sm text-red-600 bg-red-100 dark:bg-red-900 p-2 rounded">{errorMsg}</p>}

          {/* Success Message */}
          {successMsg && <p className="text-sm text-green-600 bg-green-100 dark:bg-green-900 p-2 rounded">{successMsg}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
          Don't have an account?
          <a href="#" className="ml-1 text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
