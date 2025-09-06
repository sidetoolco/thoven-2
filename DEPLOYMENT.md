# Deployment Guide for Thoven

## ✅ Completed Steps
- [x] GitHub repository created: https://github.com/sidetoolco/thoven-2
- [x] Code pushed to repository
- [x] Supabase database schema executed
- [x] Environment variables configured locally

## Next: Deploy to Vercel

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `sidetoolco/thoven-2`

### 2. Environment Variables
In Vercel Project Settings → Environment Variables, add:

**Variable Name:** `NEXT_PUBLIC_SUPABASE_URL`  
**Value:** `https://luzoarwishzfdqonsnhl.supabase.co`

**Variable Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1em9hcndpc2h6ZmRxb25zbmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODc0NDEsImV4cCI6MjA3Mjc2MzQ0MX0.Zo-FlPmH6UOdXNTjRcP7GXu-6UQ96E2aWZKYGv8aLhE`

Make sure to set these for all environments (Production, Preview, Development).

### 3. Deploy Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 4. Domain
After deployment, you can:
- Use the auto-generated Vercel domain
- Add a custom domain if desired

## Testing Checklist
After deployment, test these features:
- [ ] Landing page loads
- [ ] User signup/login works
- [ ] Teacher profiles display
- [ ] Search and filtering works
- [ ] Dashboard redirects work
- [ ] Authentication middleware works

## Database Setup Verification
Ensure these tables exist in Supabase:
- [ ] `teachers`
- [ ] `parents` 
- [ ] `students`
- [ ] `lessons`
- [ ] `reviews`
- [ ] `messages`

## Add Sample Data (Optional)
Once deployed, you can add sample teacher profiles through the signup process or directly in Supabase to test the platform.

## Repository
- **GitHub**: https://github.com/sidetoolco/thoven-2
- **Vercel**: (will be available after deployment)