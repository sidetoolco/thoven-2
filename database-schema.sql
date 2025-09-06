-- Database Schema for Thoven Music Teacher Marketplace

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    bio TEXT,
    experience_years INTEGER,
    hourly_rate DECIMAL(10,2),
    instruments TEXT[], -- Array of instruments taught
    teaching_styles TEXT[], -- Array of teaching styles
    availability JSONB, -- Store availability schedule
    location VARCHAR(255),
    profile_image_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parents table
CREATE TABLE parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table (children of parents)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INTEGER,
    skill_level VARCHAR(50) CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
    interests TEXT[], -- Array of musical interests
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings/Lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    lesson_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    lesson_type VARCHAR(50) DEFAULT 'individual' CHECK (lesson_type IN ('individual', 'group')),
    notes TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table for communication
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_parents_user_id ON parents(user_id);
CREATE INDEX idx_students_parent_id ON students(parent_id);
CREATE INDEX idx_lessons_teacher_id ON lessons(teacher_id);
CREATE INDEX idx_lessons_student_id ON lessons(student_id);
CREATE INDEX idx_lessons_date ON lessons(lesson_date);
CREATE INDEX idx_reviews_teacher_id ON reviews(teacher_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

-- Row Level Security (RLS) policies
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Teachers policies
CREATE POLICY "Teachers can view all teacher profiles" ON teachers FOR SELECT USING (true);
CREATE POLICY "Teachers can update own profile" ON teachers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Teachers can insert own profile" ON teachers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Parents policies  
CREATE POLICY "Parents can view all parent profiles" ON parents FOR SELECT USING (true);
CREATE POLICY "Parents can update own profile" ON parents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Parents can insert own profile" ON parents FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Students policies
CREATE POLICY "Parents can view own students" ON students FOR SELECT USING (
    EXISTS (SELECT 1 FROM parents WHERE parents.id = students.parent_id AND parents.user_id = auth.uid())
);
CREATE POLICY "Parents can manage own students" ON students FOR ALL USING (
    EXISTS (SELECT 1 FROM parents WHERE parents.id = students.parent_id AND parents.user_id = auth.uid())
);

-- Lessons policies
CREATE POLICY "Teachers can view own lessons" ON lessons FOR SELECT USING (
    EXISTS (SELECT 1 FROM teachers WHERE teachers.id = lessons.teacher_id AND teachers.user_id = auth.uid())
);
CREATE POLICY "Parents can view their students' lessons" ON lessons FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM students 
        JOIN parents ON parents.id = students.parent_id 
        WHERE students.id = lessons.student_id AND parents.user_id = auth.uid()
    )
);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Parents can insert reviews for their lessons" ON reviews FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM parents WHERE parents.id = reviews.parent_id AND parents.user_id = auth.uid())
);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (
    sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());