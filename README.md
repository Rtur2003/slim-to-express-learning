# Slim PHP to Express.js - Learning Project

This repository documents moving familiar Slim PHP REST API patterns into a Node.js + Express.js stack.

## Goal
- Compare Slim-style routing/controllers/middleware patterns with their Express counterparts.
- Keep the code modular and easy to extend while learning the new ecosystem.

## What I Learned
- Routing parity: `$app->get('/path')` maps to `app.get('/path')`.
- Separating controllers and middleware instead of monolithic route files.
- JWT authentication with `jsonwebtoken` (create/verify tokens).
- Parsing request bodies and headers in Express (`req.body`, `req.headers.authorization`).
- Organizing code into folders for controllers, routes, middleware, and config.

## Technologies
- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs

## Project Structure
```
project/
  controllers/          # Business logic for each resource
    notesController.js
    usersController.js
  middleware/           # Reusable request processing
    asyncHandler.js     # Wraps async handlers for error catching
    authMiddleware.js   # JWT verification
    errorHandler.js     # Centralized error responses
    requestLogger.js    # HTTP request logging
    validation.js       # Input validation and sanitization
  routes/               # Route definitions
    notes.js
    users.js
  config/
    config.js           # Environment variable loading and validation
  tests/
    notes.test.js
  server.js             # Application entry point
  .env.example          # Environment template
```

## Setup & Usage

### Quick Start
1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set a secure `JWT_SECRET` (minimum 32 characters).

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests to verify setup:**
   ```bash
   npm test
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:3000` by default.

### API Usage Example

**Register a user:**
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'
```

**Login to get token:**
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'
```

**Create a note (requires token):**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Note","content":"Note content"}'
```

**Get all notes:**
```bash
curl http://localhost:3000/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Important Notes
- All `/notes` endpoints require `Authorization: Bearer <token>`.
- Notes are stored per authenticated user (in-memory) so users cannot read or mutate others' notes.
- Missing/invalid payloads return `400` with a JSON error message.
- JWT_SECRET must be at least 32 characters for security.
- PORT must be between 1 and 65535.

## TR Ozet
- Slim'deki routing/controller/middleware ayrimlarinin Express karsiliklari gosterildi.
- JWT dogrulamasi eklendi; not islemleri token olmadan yapilamaz.
- Notlar kullanici bazli tutulur (bellek ici); yanlis/eksik istekler 400 doner.

## Note
This project is for learning purposes only; data lives in memory. Future iterations can add a database (MongoDB/MySQL).

