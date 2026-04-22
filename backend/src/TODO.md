
**TASKS**

PRIORITY: 
    BUG : [

    ]
    
    FIRST : [

        [/] - Organize the routes, controllers and services to make it so the functions are like:
            getAll__
            get__ById
            [/] - (DONE FOR CONV AND TASKS)

        ROUTES
            [/] - Complete routes/tasks.ts — all stubs, no handlers attached
            [/] - Add DELETE route for users
            [/] - Add routes for Reviews
            [] - Add routes for Hashtags
            [/] - Add routes for Messages

        CONTROLLERS
            [/] - Implement all task handlers in controllers/tasks.ts (currently empty) 
            [/ ] - Wire validation middleware calls into all controllers

        SERVICES
            [/] - users.ts — implement createUser (bcrypt), updateUser, deleteUser, getUserById
            [/] - Bycrypt
            [/] - tasks.ts — implement createTask, updateTask, deleteTask, getTaskById
            [/] - conversations.ts — implement getAllMessages, createMessage, getConversationById
            [ /] - More logic such as checkUser, checkTask (using AI thing we said), ... etc

        [/] - CREATE HASHTAGS AND REVIEWS 


        [/] - Testing of ALL endpoints ***BEFORE*** moving on!!!!!!!!!!!!!!!!!!!!!!!! (call me for us to do this tg)
    ]

    AFTER : [
        MIDDLEWARE
            [ /] - Implement JWT validation in middleware/auth.ts 
            [ /] - Implement request body validation in middleware/validate.ts
            [/ ] - Implement global error handler in middleware/errorHandler.ts
            [ /] - Configure CORS with an origin whitelist in app.ts
        AUTHENTICATION FLOW
            [ /] - POST /api/users/login — verify credentials, return JWT
            [ /] - GET /api/users/verify-email?token=... — mark emailVerified = true
            [/] - Add JWT_SECRET to .env and load in auth middleware
            [ /] - Ensure registration hashes password and creates EmailVerificationToken
    ]

    LAST : [
        ENVIRONMENT & CONFIG
        [/ ] - Add JWT_SECRET, NODE_ENV, CORS_ORIGIN to .env and .env.example
        [ ] - Add rate limiting on login and registration routes
        [ ] - Add university email validation

    TESTING & DATA
        [ ] - creating a command that runs both npm & npx to run both backend and frontend at the same time
        [ ] - Write integration tests
        [ ] - Expand seed data in prisma/seed.ts
        [ ] - Add database trigger constraints to prevent past due dates

    POLISH
        [ ] - Replace console.log with a proper logger
        [ ] - Delete or implement the empty script.ts
        [ ] - Add shared TypeScript interfaces in src/types/
    ]




