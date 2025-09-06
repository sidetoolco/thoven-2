export interface Teacher {
  id: string
  user_id: string
  first_name: string
  last_name: string
  bio?: string
  experience_years?: number
  hourly_rate?: number
  instruments?: string[]
  teaching_styles?: string[]
  availability?: Record<string, unknown>
  location?: string
  profile_image_url?: string
  verified: boolean
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface Parent {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone?: string
  location?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  parent_id: string
  first_name: string
  last_name: string
  age?: number
  skill_level?: 'beginner' | 'intermediate' | 'advanced'
  interests?: string[]
  notes?: string
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  teacher_id: string
  student_id: string
  lesson_date: string
  duration_minutes: number
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  lesson_type: 'individual' | 'group'
  notes?: string
  price?: number
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  teacher_id: string
  parent_id: string
  lesson_id: string
  rating: number
  comment?: string
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  subject?: string
  content: string
  read: boolean
  created_at: string
}