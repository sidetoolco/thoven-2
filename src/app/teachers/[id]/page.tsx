import { createClient } from '@/lib/supabase/server'
// import { Teacher, Review } from '@/types/database'
import { notFound } from 'next/navigation'
import BookingButton from '@/components/BookingButton'

interface TeacherProfileProps {
  params: { id: string }
}

export default async function TeacherProfilePage({ params }: TeacherProfileProps) {
  const supabase = await createClient()
  
  const { data: teacher, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !teacher) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      parents (
        first_name,
        last_name
      )
    `)
    .eq('teacher_id', params.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">
                {teacher.first_name[0]}{teacher.last_name[0]}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {teacher.first_name} {teacher.last_name}
              </h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center">
                  <span className="text-yellow-300">★</span>
                  <span className="ml-1">{teacher.rating.toFixed(1)}</span>
                  <span className="ml-1 opacity-75">
                    ({teacher.total_reviews} reviews)
                  </span>
                </div>
                {teacher.verified && (
                  <span className="bg-green-500 px-2 py-1 rounded-full text-sm font-medium">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {teacher.bio || 'No bio available.'}
                </p>
              </section>

              {/* Instruments */}
              {teacher.instruments && teacher.instruments.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Instruments</h2>
                  <div className="flex flex-wrap gap-2">
                    {teacher.instruments.map((instrument: string) => (
                      <span
                        key={instrument}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {instrument}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Teaching Styles */}
              {teacher.teaching_styles && teacher.teaching_styles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Teaching Styles</h2>
                  <div className="flex flex-wrap gap-2">
                    {teacher.teaching_styles.map((style: string) => (
                      <span
                        key={style}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Reviews */}
              {reviews && reviews.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
                  <div className="space-y-4">
                    {reviews.map((review: { id: string; rating: number; comment?: string; created_at: string; parents?: { first_name: string; last_name: string } }) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-yellow-500">
                              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </span>
                            <span className="ml-2 font-medium text-gray-900">
                              {review.parents?.first_name} {review.parents?.last_name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 space-y-6 sticky top-8">
                {/* Pricing */}
                {teacher.hourly_rate && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                    <div className="text-3xl font-bold text-indigo-600">
                      ${teacher.hourly_rate}
                      <span className="text-base font-normal text-gray-500">/hour</span>
                    </div>
                  </div>
                )}

                {/* Experience */}
                {teacher.experience_years && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-gray-700">
                      {teacher.experience_years} years of teaching experience
                    </p>
                  </div>
                )}

                {/* Location */}
                {teacher.location && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{teacher.location}</p>
                  </div>
                )}

                {/* Book Lesson Button */}
                <BookingButton teacherId={teacher.id} />

                {/* Contact Button */}
                <button className="w-full px-4 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}