import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-indigo-600">Thoven</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/teachers" className="text-gray-700 hover:text-indigo-600">
                Find Teachers
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-indigo-600">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with
            <span className="text-indigo-600 block">Music Teachers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find qualified music instructors for your child. Browse profiles, read reviews, 
            and book lessons with verified teachers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teachers"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Find Teachers
            </Link>
            <Link
              href="/signup"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Join as Teacher
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Thoven?
            </h2>
            <p className="text-lg text-gray-600">
              The trusted platform for music education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Teachers</h3>
              <p className="text-gray-600">
                All our music teachers are verified and have proven teaching experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from parents and students to make the best choice.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 12v-4m0 0V7m0 0h0m4 3v4m0 0v4m0-4h4M7 13v4m0-4H3m4 0H7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure booking process with flexible scheduling options.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of families who have found their perfect music teacher on Thoven.
          </p>
          <Link
            href="/signup"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Thoven</h3>
            <p className="text-gray-400 mb-4">
              Connecting music teachers with students since 2024
            </p>
            <div className="flex justify-center space-x-8">
              <Link href="/teachers" className="text-gray-400 hover:text-white">
                Find Teachers
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white">
                Sign In
              </Link>
              <Link href="/signup" className="text-gray-400 hover:text-white">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}