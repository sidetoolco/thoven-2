'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Teacher } from '@/types/database'
import Link from 'next/link'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [instrumentFilter, setInstrumentFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('rating', { ascending: false })

      if (error) throw error
      setTeachers(data || [])
    } catch (error) {
      console.error('Error fetching teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesInstrument = !instrumentFilter || 
      teacher.instruments?.some(instrument => 
        instrument.toLowerCase().includes(instrumentFilter.toLowerCase())
      )
    
    const matchesLocation = !locationFilter ||
      teacher.location?.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesInstrument && matchesLocation
  })

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Music Teachers</h1>
        <p className="mt-2 text-lg text-gray-600">
          Discover qualified music instructors for your child
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrument
            </label>
            <input
              type="text"
              placeholder="e.g. Piano, Guitar..."
              value={instrumentFilter}
              onChange={(e) => setInstrumentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city or area..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No teachers found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-lg">
                      {teacher.first_name[0]}{teacher.last_name[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {teacher.first_name} {teacher.last_name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {teacher.rating.toFixed(1)} ({teacher.total_reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {teacher.instruments && teacher.instruments.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher.instruments.slice(0, 3).map((instrument) => (
                        <span
                          key={instrument}
                          className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          {instrument}
                        </span>
                      ))}
                      {teacher.instruments.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{teacher.instruments.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {teacher.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {teacher.bio.substring(0, 120)}
                    {teacher.bio.length > 120 ? '...' : ''}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {teacher.experience_years && (
                      <span>{teacher.experience_years} years exp.</span>
                    )}
                    {teacher.hourly_rate && (
                      <span className="block font-semibold text-gray-900">
                        ${teacher.hourly_rate}/hour
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/teachers/${teacher.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}