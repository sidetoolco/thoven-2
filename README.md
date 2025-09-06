# Thoven - Music Teacher Marketplace

A platform connecting music teachers with parents and students. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **User Authentication**: Secure login/signup with Supabase Auth
- **Teacher Profiles**: Comprehensive profiles with ratings, reviews, and specializations
- **Search & Filter**: Find teachers by instrument, location, and other criteria
- **Booking System**: Schedule lessons with teachers (coming soon)
- **Reviews & Ratings**: Parent feedback system for teachers
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd thoven-2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up the database:
- Create a new Supabase project
- Run the SQL commands from `database-schema.sql` in your Supabase SQL editor

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following main tables:
- `teachers` - Teacher profiles and information
- `parents` - Parent accounts
- `students` - Children/students linked to parents
- `lessons` - Lesson bookings and scheduling
- `reviews` - Teacher reviews and ratings
- `messages` - In-app messaging system

See `database-schema.sql` for the complete schema with RLS policies.

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Database Setup

After deployment, make sure to:
1. Create your Supabase project
2. Run the database schema
3. Configure authentication settings
4. Update the environment variables

## User Types

The platform supports two types of users:

### Parents
- Browse and search for music teachers
- View teacher profiles and reviews
- Manage their children's profiles
- Book lessons (coming soon)
- Leave reviews for teachers

### Teachers
- Create and manage teaching profiles
- Set availability and rates
- View and manage lessons
- Communicate with parents

## Next Steps

To complete the platform, consider adding:
- [ ] Booking system with calendar integration
- [ ] Payment processing
- [ ] In-app messaging
- [ ] Email notifications
- [ ] Video lesson support
- [ ] Advanced search filters
- [ ] Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.