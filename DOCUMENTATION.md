# TaskMate — Code Authorship & Contributors

This document identifies the authors of different sections of the codebase in accordance with CW3 submission requirements.
Authorship can be further verified via the GitHub repository commit history.

---

## Contributor Overview

| Contributor   | Commits | Primary Role                              |
|---------------|---------|-------------------------------------------|
| Theo          | 132     | Lead developer, architect, project manager |
| onyshchu & lexaOny      | 92      | Frontend UI, screens, components          |
| scoutingb     | 36      | Frontend feature screens & logic          |
| t-raisin      | 24      | Backend endpoints                         |
| Joephill      | 4       | Frontend auth screens                     |

---

## Theo — Lead Developer & Project Manager

**Role:** Full-stack lead, system architect, project manager, and mentor.
Responsible for the overall direction of the project, task assignment, enforcing the Git branching strategy, teaching team members how hooks, APIs, endpoints, and folder structure work, and supporting teammates with debugging and code comprehension.

### Backend
| Area | Files |
|---|---|
| Project initialisation & backend skeleton | `backend/src/server.ts`, `backend/src/app.ts` |
| Database client singleton | `backend/src/db.ts` |
| Prisma schema & all models | `backend/prisma/schema.prisma` |
| Seed data | `backend/prisma/seed.ts` |
| JWT dual-token authentication | `backend/src/middleware/authentication/auth.ts` |
| Zod validation middleware | `backend/src/middleware/validation/validate.ts` |
| Validation schemas (tasks, messages, events, users, reviews, hashtags) | `backend/src/middleware/validation/schemas/` |
| Tasks routes, controller, services | `backend/src/routes/tasks.ts`, `backend/src/controllers/tasks.ts`, `backend/src/services/tasks.ts` |
| Conversations routes, controller, services | `backend/src/routes/conversations.ts`, `backend/src/controllers/conversations.ts`, `backend/src/services/conversations.ts` |
| Auth routes & services | `backend/src/routes/auth.ts`, `backend/src/services/auth.ts` |
| Auth controller | `backend/src/controllers/auth.ts` |
| Email verification & transactional email | `backend/src/services/email.ts` |
| Rate limiting, CORS, middleware setup | `backend/src/app.ts` |
| Docker containerisation | `backend/Dockerfile`, `backend/docker-compose.yml` |
| User services refactoring & security fixes | `backend/src/services/users.ts` |
| Payment gateway integration (frontend side) | `frontend/src/api/transactions.ts` |

### Frontend
| Area | Files |
|---|---|
| Expo initialisation & skeleton | `frontend/` (initial setup) |
| API abstraction layer | `frontend/src/api/` |
| React Query hooks (tasks, initial setup) | `frontend/src/hooks/useTasks.ts` |
| Auth state & AsyncStorage token management | `frontend/src/auth/` |
| Sign-out flow & token storage on login | `frontend/src/screens/LoginScreen/` |
| Task button states, completion, in-progress logic | `frontend/src/screens/MyTasksScreen/` |
| Task assignment UX, quit task, navigation fixes | `frontend/src/screens/ViewTaskScreen/` |
| Message polling & chat display | `frontend/src/screens/ChatScreen/` |
| Edit task screen fixes | `frontend/src/screens/EditTask/` |
| Image upload fixes & Supabase storage refactor | Multiple frontend screens |
| Frontend validation schemas | `frontend/src/validation/` |

### Commit Reference
```
79ab564 - Adding username login possibility
21b0926 - minor changes
2e5197b - Payment gateway (#10)
54d396d - fix unassign task
e2a5fc8 - fix task button states based on due date and progress status
e03f14e - Implementing complete task completion
db72254 - fixed editTask screen and filtered back in the events the current user published
4196676 - Made it so messages show the task and who they are
d03c0cc - Fix task assignment UX: filter applied/own tasks, add quit task, fix navigation
7a1c1ae - fix constant polling
00f7001 - polling messages
5124398 - task image fix
76b19b8 - Fixing get events issue
e0ef45f - Containerizing backend with docker
c25c400 - image upload fix
a518eea - removed upsert to upload images
7f5e246 - Supabase Image storage fix attempt
9a06044 - falling back to baseURI
d6d8032 - final fix attempt
e79dc4f - Image uri to supabaseStorage refactor
7a4582c - Switching from raw Uri to supabase storage
a4912c7 - Fixing AsyncStorage errors caused by breaking of abstraction
91140e9 - Changed key name
77a90ac - fixing Image String issue
b0f3b61 - Added remaining API requests
95c4eef - Added limit rating to protect from DOS and DDOS attacks
4740c2a - Added reviews get all
b29cc05 - removing select to return full review object
ef9f7ec - Adding userId to async storage when logged in
c5a2170 - Adding signout functionality to frontend
03ac6c0 - Adding location, images and people required to validation schema
ee3563e - Changes to frontend login to store tokens
92003f5 - Version 1.0 (No logic implemented in frontend) (#7)
753edaf - Refactor of userID
90c295c - Minor changes
d067a70 - Adding getUserRating to reviews
bda846d - changing login wrong password error message
9f93e24 - changing emailverif token to 8-char
b63313d - Refactor of schemas removing z.never() and fixing getUserByUsernameOrEmail
9ce5508 - minor changes
2390f3e - minor changes
40311b1 - adding validation, authentication, hooks and initial task reference for api fetches
8fd7d82 - Minor change to backend and folder change to frontend
8d1bdbe - Authentication additions in all models, fixing many issues with newly committed code
d83d59e - adding location and people required to tasks
d97c2f6 - Finishing event schema
61b647c - Began Events schema
a0c1020 - Added user general update not being allowed to change password without verification
8a5f760 - Added changing password functionality with password verification
d82fa18 - Added tasks for toby and myself, finished email verification
5572dc0 - Refactoring how assigning task work (publisher needs to accept or reject assignee application)
e7d5e3f - Task & user update refactor to patch, adding status changing endpoint
f219dcc - Frontend and backend fixes
b38a4dd - Revert "Frontend and backend fixes"
25f0cc3 - reviews auth refactor
db72e91 - Wired up withAuth to all non-public endpoints
5a6cd0d - Finalizing JWT authentication, created withAuth function
d0f9bfb - small changes
57d1940 - Generate tokens in create user and login
74b0e34 - Fixed security issue in update User + further JWT + new refreshToken Table on prisma
03de15e - Changed the folder structure of validation, added validation middleware to routes
356d27e - finished tasks and messages zod schemas
56f3c83 - Changed hashtag route naming convention
06014c3 - More additions to middleware
1a3b978 - Began authentication skeleton
2ec92e7 - removing auth skeleton to be made again
5e4e760 - Fixing bugs found in endpoints and adding more
450d739 - Beginning authentication and validation schema
a389835 - finished task controller, route and services
c894e23 - Completed conversation endpoints (Controller, Service, Route)
554ef4d - Completing conversation Services
2ca84f1 - Finishing conversation controller and began conversation DB services
cd1ce22 - Making changes and additions to tasks in controller, routes and services
a9cd949 - Adding changes to endpoints, and organizing them
e845cae - Minor changes
7046a7f - Making multiple changes in backend architecture, adding routes/controllers/services
c2e2385 - Making some endpoints, and adding endpoints TODO
e502941 - Adding TODOs to router/controller
7230d47 - Creating and fixing the chat tables (messages and conversations 1-to-1)
dcd9486 - further changes and beginning to make endpoints
69cc838 - Changing jobs to tasks
1ca959c - Adding more to the seed so that all tables can be tested
a4f049a - Creating initial version of db schema, config changes, seed test data implementation
007b4a9 - Implementing Prisma and PostgreSQL and initializing Supabase DB
35f2619 - removing Depreciation issue
162078d - Adding some guidelines on readme on how to start project
ad8f3d6 - Add team members to README
97c9f9d - Update README.md
a97f186 - Update README.md
0f7846b - Adding new folders and first component as tutorial (#4)
a3fd38d - frontend initialization, expo skeleton (#3)
64ad877 - Backend init (#2)
e904126 - Adding env folder, gitIgnore, and extra folders on src for future dev
3230506 - Initializing Backend Node.js Skeleton Structure
27b8615 - Initial commit
```

---

## Alex (onyshchu & lexaOny) — Frontend UI & Screens

**Role:** Frontend developer responsible for UI design, screen layout, navigation structure, and visual components.

### Frontend
| Area | Files |
|---|---|
| Folder structure setup, screens & hooks folders | `frontend/src/screens/`, `frontend/src/hooks/` |
| Custom header component | Shared header across all screens |
| Main navigation & tab navigation | Navigation setup |
| Opening, Login, SignUp screens (UI & logic) | `frontend/src/screens/LoginScreen/`, `frontend/src/screens/SignUpScreen/`, `frontend/src/screens/OpeningScreen/` |
| Email verification logic | `frontend/src/screens/EmailConfirmationScreen/` |
| User profile & public profile screens | `frontend/src/screens/UserProfileScreen/`, `frontend/src/screens/PublicProfileScreen/` |
| Settings screen | `frontend/src/screens/SettingsScreen/` |
| Reset password screen | `frontend/src/screens/ResetPasswordScreen/` |
| Leave review & view review screens | `frontend/src/screens/LeaveReviewScreen/`, `frontend/src/screens/ViewReviewScreen/` |
| Star rating component | Reusable star rating UI |
| Custom avatar component | Reusable avatar component |
| View task & view event screens | `frontend/src/screens/ViewTaskScreen/`, `frontend/src/screens/ViewEventScreen/` |
| View own task screen | `frontend/src/screens/ViewOwnTaskScreen/` |
| Card details screen | `frontend/src/screens/CardDetailsScreen/` |
| Edit task screen | `frontend/src/screens/EditTask/` |
| Create event screen | `frontend/src/screens/CreateEventScreen/` |
| useReviews hook | `frontend/src/hooks/useReviews.ts` |
| useProfile hook | `frontend/src/hooks/useUsers.ts` |
| App icon | Project assets |

### Commit Reference
```
e742bda - minor UI fix
8344c0f - minor fixes.
da4264a - minor fix
488e918 - App icon changed
01277ac - Icons updated
e019b60 - View Own task screen update
9062469 - accessibility screen added
9f6d4af - Card details screen added
6f33948 - CardDetailScreen prototype
d3064ed - View event, View task added notations
1fca99b - building profile
e79b925 - Minor profile card fixes
5c502e7 - Minor UI fixes. Keyboard avoid view added
bf0a1f6 - User profile logout in case of error added. Custom header fix
89eecb1 - Header fix
3e17d30 - View event screen logic finished
915be81 - view review styles improvement
f5e1a93 - View Task img fix
ef1eb6e - Opening styles fixed
2be2dc6 - Custom header now shows profile picture
497bbc0 - review screens implemented into navigation
3c2d26f - Leave review screen created
e89931a - StarRating buttons created
2db6a30 - View Review Screen added
44be88f - Other user profile screen renamed. Minor fixes
8995a89 - Poster card is now profile card
b259eab - useReview hook added, poster card reworked
8f3b106 - user data fix
8e0629a - hot fix
19135e3 - OtherUserProfileScreen added
636823f - reset password screen integrated
71d3fc2 - reset password screen added
29f8287 - Header fixed. log out added
9d48284 - settingsScreen logic added
8c97a29 - User profile logic
d21ea19 - auth and login reworked
3be3868 - use reviews added
0c2a630 - useReviews fixed
d05bcf4 - Customer avatars updated to suite new design
b6f3baa - useProfile, styles added
9b5c5b0 - login screen fix
c515575 - backend fix
cc214d7 - Login logic
9d51c37 - Email verification logic
9229d13 - SignUp logic, Opening screen fix
56afe74 - Sign up api, hooks, validation added
94dca56 - Added validation on frontend
e8d2664 - insignificant backend fixes
9dc130c - Import routes hotfix
ccb9bd4 - Added Edit task screen
86a96ed - Added ViewEvent, ViewOwnTask, ViewTask Screens
79f7de6 - Added Poster card, review card, minor nav fixes
cf76b68 - Added createEvent + minor fixes
bce2cad - Added UserProfileScreen, Settings screen
3277f3c - Review card component added
db40d75 - stars component added
00241ab - Custom avatar component added. CustomHeader Updated
f320ae8 - TasksScreen + CreateTaskScreen nav added
8737222 - Create task screen finished
9b9b230 - Added Tasks placeholder, Added CreateTaskScreen
97804ad - Fixed navigation, fixed custom header, fixed avatar shaking
09bfed7 - Merge branch dev + Custom header
0e41c01 - Custom Header created and added to every screen
bdd3530 - MainNavigation finished and added to main pages
5a3f931 - Added MainNavigationTab and placeholders for a few screens
38e8b7e - Folder structure changed. Separate folder for each page + Hooks and Context folder created
41773b4 - Added styles.ts for each page, fixed bug with importing image
593f645 - Fixed styles in LogIn&SignUp. Added AppBar for both
1b6743d - Added opening screen and Tab navigation
45e1ba9 - Added screens folder, DevMenu, Placeholders for majority of pages
949449c - minor fixes
926e101 - Resolved merge conflicts with dev
7fbe660 - Minor fixes
2f8fb51 - Minor fixes
6139377 - Screens/email confirmation screen merge (#6)
988c2a6 - Added Create Task Screen (#5)
```

---

## Aaron (scoutingb) — Frontend Feature Screens & Logic

**Role:** Frontend developer responsible for core task/event feature screens, chat integration, and UI logic.

### Frontend
| Area | Files |
|---|---|
| Login screen (basic) | `frontend/src/screens/LoginScreen/` |
| Sign up screen (basic) | `frontend/src/screens/SignUpScreen/` |
| Task card & noticeboard card components | Reusable task card component |
| Tasks screen | `frontend/src/screens/TasksScreen/` |
| Events screen & event card component | `frontend/src/screens/EventsScreen/` |
| My Tasks screen | `frontend/src/screens/MyTasksScreen/` |
| Create task screen | `frontend/src/screens/CreateTaskScreen/` |
| Create event screen | `frontend/src/screens/CreateEventScreen/` |
| View task screen (logic) | `frontend/src/screens/ViewTaskScreen/` |
| View event screen | `frontend/src/screens/ViewEventScreen/` |
| Chat screen, chats screen, chat card | `frontend/src/screens/ChatScreen/`, `frontend/src/screens/ChatsScreen/` |
| Task application & accepting logic | Application flow integration |
| Events hooks | `frontend/src/hooks/useEvents.ts` |
| Image uploading & category filtering | Task/Event screens |
| Message timestamps & refresh timer | Chat screen |
| Sort button & numeric keypad enforcement | Task/Event screens |

### Commit Reference
```
09214e5 - Added date to timestamp on chatscreen
5f0626e - Added number check to event participants, removed sort button
24ccf0c - Added string check to number fields in create task screen
925f587 - rolled back refresh on conversations hook
71698ed - Added timestamps to messages, added refresh timer to hooks
b90fed7 - Added sort button
a6a6a60 - Forced numeric keypad on create screens, filtered user tasks
0a7b4a1 - Fixed wording on ViewTask and ViewEvent screens, made due date mandatory
6cda06f - Added MyTasksScreen, adjusted image handling on main tasks screen
355f848 - Switched from postercard to profilecard, cleaned up some code
bbe0d32 - Implemented task application and accepting, chat screens, hooks and api integration
0546695 - Added EventsScreen, CreateEventScreen, and ViewEventScreen
2f2af06 - Added events hooks, first versions of CreateEventScreen and EventsScreen
248a954 - Added category to ViewTaskScreen
3000c73 - Updated task screens, implemented category selection and filtering, image uploading
c427b62 - Added first round of logic to Tasks, CreateTaskScreen, and ViewTaskScreen
3f8c9b4 - Added ChatsScreen, ChatScreen, and ChatCard
e64a3a6 - Updated tasks and events screens to match design doc
f838416 - Made Events and My Tasks screen. Created event card component
cdfa5bb - Added card components for task list and noticeboard, created tasks screen
7b83581 - Added basic sign up screen, cleaned code for login screen
e61373f - Fixed dependency tree conflict by specifying react-dom version
d7d5533 - Added declarations file to fix image import errors
57e4ff5 - Basic login screen, images folder, changed statusbar colours
```

---

## Toby (t-raisin) — Backend Endpoints

**Role:** Backend developer responsible for implementing users, reviews, hashtags, events, and transactions endpoints.

### Backend
| Area | Files |
|---|---|
| Users routes, controller, services | `backend/src/routes/users.ts`, `backend/src/controllers/users.ts`, `backend/src/services/users.ts` |
| Reviews routes, controller, services | `backend/src/routes/reviews.ts`, `backend/src/controllers/reviews.ts`, `backend/src/services/reviews.ts` |
| Hashtags routes, controller, services | `backend/src/routes/hashtags.ts`, `backend/src/controllers/hashtags.ts`, `backend/src/services/hashtags.ts` |
| Events routes, controller, services | `backend/src/routes/events.ts`, `backend/src/controllers/events.ts`, `backend/src/services/events.ts` |
| Transactions routes, controller, services | `backend/src/routes/transactions.ts`, `backend/src/controllers/transactions.ts`, `backend/src/services/transactions.ts` |
| Zod validation for users, reviews, hashtags | `backend/src/middleware/validation/schemas/` |
| Event application logic | Events assignment endpoints |
| University email validation | User creation validation |

### Commit Reference
```
abcb87c - Changed payment flow so it only runs in the backend
33df7d8 - payment triggers on task creation
54c14b6 - moved release transaction creation to releaseTransaction
f1b318a - added part of the front-end for transactions
f0aacb5 - Updated transactions so they either get created, released, or refunded
f4924fb - changing 'payments' to 'transactions'
9a5e54a - Created task: university email validation
c4b225f - Created transactions/payments temporarily for processing
42a9b06 - Fixed any issues with endpoints during testing
a98e40e - Fixed user any type error in CustomerAvatars.tsx
74c472e - Added application to events
4a21afc - Implemented events router, controller, services, and validation schema
38c5514 - Zod validation for users, reviews, and hashtags
f31c458 - Fixed error handling for users, reviews, and hashtags
edd83c7 - Fixed Users, Reviews, and Hashtags endpoints
601e87f - Fixing users again
dc1121c - Fixing users
a36aea3 - Removed userID from create User
3fdfbab - Hashtags Routes, Controller, and Services implemented
4539b25 - Fixed reviews
ddca35e - Reviews Routes, Controller, and Services implemented
a23af29 - Users Routes, Controllers, and Services implemented
```

---

## Joephill — Frontend Auth Screens

**Role:** Frontend developer responsible for the forgot password flow and email confirmation screen.

### Frontend
| Area | Files |
|---|---|
| Email confirmation screen & swiping navigation | `frontend/src/screens/EmailConfirmationScreen/` |
| Forgot password flow & navigation logic | `frontend/src/screens/ResetPasswordScreen/` |
| Change password screen | `frontend/src/screens/SettingsScreen/` |
| UI fixes for keyboard and text input on opening screens | Opening screens |

### Commit Reference
```
caca847 - Added forgot password flow with navigation logic
fa2143b - Added email and occupation to settings, new change password screen
15efb1d - Fixed UI problems with keyboard and viewing textboxes on opening screens
9fe718f - Feature: added Email Confirmation page and swiping navigation for it
```

---

*Full commit history available at: https://github.com/Theo-Lake/Software-Engineering-Project-2026*
