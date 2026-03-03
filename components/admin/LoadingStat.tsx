export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
  
      <div className="relative">
 
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      <p className="text-sm font-medium text-slate-500 dark:text-gray-400 animate-pulse">
        Loading...
      </p>

      {/* Accessibility */}
      <span className="sr-only">Loading content...</span>
    </div>
  );
}