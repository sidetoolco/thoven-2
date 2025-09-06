import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const userType = user.user_metadata?.user_type || 'parent'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.email}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {userType === 'teacher' 
            ? 'Manage your teaching profile and lessons' 
            : 'Find the perfect music teacher for your child'
          }
        </p>
      </div>

      {userType === 'parent' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Teachers</h2>
            <p className="text-gray-600 mb-4">
              Browse through qualified music teachers in your area
            </p>
            <Link
              href="/teachers"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Teachers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Students</h2>
            <p className="text-gray-600 mb-4">
              Manage your children&apos;s music education and progress
            </p>
            <a
              href="/students"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Students
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Lessons</h2>
            <p className="text-gray-600 mb-4">
              Keep track of upcoming and past music lessons
            </p>
            <a
              href="/lessons"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Lessons
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h2>
            <p className="text-gray-600 mb-4">
              Update your teaching profile and availability
            </p>
            <a
              href="/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Profile
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Lessons</h2>
            <p className="text-gray-600 mb-4">
              View and manage your upcoming teaching sessions
            </p>
            <a
              href="/lessons"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Lessons
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
            <p className="text-gray-600 mb-4">
              See what parents and students say about your teaching
            </p>
            <a
              href="/reviews"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Reviews
            </a>
          </div>
        </div>
      )}
    </div>
  )
}