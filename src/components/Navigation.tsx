'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user?.user_metadata?.user_type) {
        setUserType(user.user_metadata.user_type)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user?.user_metadata?.user_type) {
          setUserType(session.user.user_metadata.user_type)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              Thoven
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              {userType === 'parent' && (
                <>
                  <Link
                    href="/teachers"
                    className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  >
                    Find Teachers
                  </Link>
                  <Link
                    href="/students"
                    className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  >
                    My Students
                  </Link>
                </>
              )}
              {userType === 'teacher' && (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/lessons"
                    className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  >
                    My Lessons
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}