'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaFilm, FaTrophy, FaBolt, FaUsers } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <FaFilm className="text-4xl" />,
      title: 'Latest Movies',
      description: 'Questions from the most popular Hollywood and Bollywood movies'
    },
    {
      icon: <FaTrophy className="text-4xl" />,
      title: 'Global Leaderboard',
      description: 'Compete with movie enthusiasts from around the world'
    },
    {
      icon: <FaBolt className="text-4xl" />,
      title: 'Multiple Difficulties',
      description: 'Choose from easy, medium, or hard quiz levels'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Track Progress',
      description: 'Monitor your scores and improve over time'
    }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 bg-clip-text text-transparent">
            Movie Quiz Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Test your knowledge of Hollywood and Bollywood cinema. From blockbusters to classics, 
            challenge yourself with questions about your favorite movies!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/leaderboard')}
              className="btn-secondary text-lg px-8 py-4"
            >
              View Leaderboard
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Why Choose Our Quiz?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card text-center hover:scale-105"
            >
              <div className="flex justify-center mb-4 text-primary-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Quiz Categories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Hollywood', image: '🎬', color: 'from-red-600 to-red-800' },
            { name: 'Bollywood', image: '🎭', color: 'from-yellow-600 to-orange-600' },
            { name: 'Mixed', image: '🌟', color: 'from-purple-600 to-pink-600' }
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card bg-gradient-to-br ${category.color} cursor-pointer hover:scale-105`}
              onClick={handleGetStarted}
            >
              <div className="text-6xl text-center mb-4">{category.image}</div>
              <h3 className="text-2xl font-bold text-center">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="card bg-gradient-to-r from-primary-600 to-secondary-600 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Test Your Movie Knowledge?</h2>
          <p className="text-xl mb-8">Join thousands of movie enthusiasts and start your quiz journey today!</p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start Quiz Now
          </button>
        </motion.div>
      </section>
    </div>
  );
}
