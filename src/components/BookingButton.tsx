'use client'

import { useState } from 'react'

interface BookingButtonProps {
  teacherId: string
}

export default function BookingButton({ teacherId }: BookingButtonProps) {
  const [showBooking, setShowBooking] = useState(false)

  const handleBooking = () => {
    // TODO: Implement booking functionality
    setShowBooking(true)
    alert('Booking functionality coming soon!')
  }

  return (
    <button
      onClick={handleBooking}
      className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
    >
      Book a Lesson
    </button>
  )
}