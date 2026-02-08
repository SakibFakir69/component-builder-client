'use client'

import { useCreateUserMutation } from '@/lib/api/baseApi';
import Link from 'next/link';
import React, { useState } from 'react';


import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon, ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signin1: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createUser] = useCreateUserMutation();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    setIsLoading(true);
    try {
      console.log(formData)
      const res = await createUser(formData).unwrap();
      console.log(res);
    
      toast.success('User created successfully')
      router.push('/auth/login')
      // Redirect or show success message
    } catch (err:any) {
      console.error('Failed to create user:', err);
      toast.error(`${err.data?.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Toaster/>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Step {step} of 3</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gray-900 dark:bg-gray-100 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <UserIcon />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Create account</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Set up your credentials"}
              {step === 3 && "Review your details"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />

                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-md">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <CheckIcon /> Review Details
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Name:</span> <span>{formData.fullName}</span></div>
                    <div className="flex justify-between"><span>Email:</span> <span>{formData.email}</span></div>
                    <div className="flex justify-between"><span>Password:</span> <span>••••••••</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Next/Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md"
            >
              {step < 3 ? 'Next Step →' : isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={handleBack}
              className="mt-4 w-full text-gray-600 dark:text-gray-400"
            >
              ← Back
            </button>
          )}

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin1;
