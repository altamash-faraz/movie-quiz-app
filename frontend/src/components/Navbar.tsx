'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFilm, FaTrophy, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-primary-400 transition-colors">
            <FaFilm className="text-2xl text-primary-500" />
            <span>Movie Quiz</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <FaUser />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <FaTrophy />
                  <span>Leaderboard</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">Hi, {user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-1"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary py-2 px-4"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
