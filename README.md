# TaskMate
**University Task & Events Platform**
Lancaster University — Software Engineering Project 2026

A mobile application for university students to publish, discover, and complete tasks and events within their university community.

---

## Team

| Name | Role |
|---|---|
| Theo Scarton Lago | Group Leader, Backend Lead, Full-stack |
| Alex Onyshchuk | Frontend Lead |
| Aaron Skelhorn | Frontend |
| Joephill Thomas | Frontend |
| Toby Raisey | Backend |

---

## About

TaskMate is a mobile-first platform exclusive to university students and staff. Users sign up with their university email and student ID to verify their identity. Once registered, they can publish tasks or events, apply to complete tasks posted by others, communicate via in-app messaging, and leave reviews for completed work.

### Tasks
Small one-off jobs that a user can publish for others to complete. Each task includes a name, description, category, price, due date, location, and optional images.
- Other users can apply to complete a task
- The publisher accepts or rejects applicants
- Once matched, a 1-to-1 chat opens between publisher and assignee
- Payment is held in escrow on task creation and released to the assignee on completion, or refunded if cancelled

### Events
Free publications for university events. Each event includes a name, description, category, location, due date, and optional images.
- Users can apply to attend or participate
- Publisher accepts or rejects applicants

---

## Features Implemented

- User registration with university email verification (6-digit token)
- Login with dual-token JWT authentication (access + refresh)
- Password reset flow via email token
- Task publishing, editing, and deletion
- Event publishing, editing, and deletion
- Task & event application system (apply, accept, reject)
- Task completion and status tracking (not started, in progress, complete, cancelled)
- Escrow-based payment system (hold, release, refund)
- 1-to-1 messaging with real-time polling
- User profiles with profile pictures
- Reviews and star ratings between users
- Hashtag tagging on tasks and events
- Image uploads on tasks and events
- Accessibility screen
- Settings screen (update profile, change password)

---

## Tech Stack

**Backend:** Node.js, Express.js, TypeScript, Prisma, Supabase (PostgreSQL), JWT, bcrypt, Zod, Nodemailer, express-rate-limit, Docker

**Frontend:** React Native, Expo, TypeScript, React Navigation, TanStack React Query, Axios, Zod, AsyncStorage, React Native Paper

---

## Running the Project

### Frontend
```bash
cd frontend
npx expo start
```

### Backend
```bash
cd backend
docker compose up
```

### Backend (without Docker)
```bash
cd backend
npm run dev
```

### Environment Variables
Create a `.env` file in `backend/` with the following:
```
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
SMTP_USER=
SMTP_PASS=
FRONTEND_URL=
PLATFORM_USER_ID=
PORT=4000
```

---

## Repository Structure

```
/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── generated/prisma/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   └── docker-compose.yml
├── frontend/         # Expo React Native app
│   └── src/
│       ├── screens/
│       ├── hooks/
│       ├── api/
│       ├── auth/
│       └── validation/
└── CONTRIBUTORS.md
```
