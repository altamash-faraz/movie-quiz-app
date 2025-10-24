'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">🎬 Movie Quiz</h1>
        <p className="text-gray-600 mb-8">Test your movie knowledge with fun quizzes!</p>
        
        <div className="space-y-4">
          <button 
            onClick={handleGetStarted}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </button>
          
          {!isAuthenticated && (
            <div className="text-sm text-gray-500">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/login')}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-xs text-gray-400">
          Simple movie trivia for everyone
        </div>
      </div>
    </div>
  );
}
