
# ShopSocial

AI-Powered Social Discovery for Businesses

## Features
- Business discovery feed
- Search & filter businesses
- Social polls for group planning
- Bill splitting
- Reviews & ratings
- Analytics dashboard for business owners
- Friend system

## Tech Stack
- Next.js (React, TypeScript)
- TailwindCSS
- Framer Motion
- Supabase (Postgres, Auth, Storage)

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Set up Supabase
- Create a project at [supabase.com](https://supabase.com/)
- Get your project URL and anon/public key
- Add them to a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run the development server
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Folder Structure
- `src/app/` — Pages (feed, business, search, polls, expenses, reviews, dashboard, auth, profile, friends)
- `src/components/` — UI components (BusinessCard, Poll, ExpenseSplitter, Review, AnalyticsChart, FriendList, Notification)

## Next Steps
- Integrate Supabase client
- Build out each feature
- Deploy to Vercel

---
This is a starter skeleton. Replace placeholder files as you build features.
