import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/teachers"
              className="block w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Browse Teachers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}