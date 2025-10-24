import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">What would you like to do?</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Link 
              href="/quiz" 
              className="block p-4 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
            >
              Start Quiz
            </Link>
            
            <Link 
              href="/scores" 
              className="block p-4 bg-green-600 text-white rounded text-center hover:bg-green-700"
            >
              My Scores
            </Link>
            
            <Link 
              href="/" 
              className="block p-4 bg-gray-200 text-gray-800 rounded text-center hover:bg-gray-300"
            >
              Home
            </Link>
            
            <button className="p-4 bg-red-200 text-red-800 rounded hover:bg-red-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
