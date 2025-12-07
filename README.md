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
  controllers/
    notesController.js
    usersController.js
  middleware/
    authMiddleware.js
    errorHandler.js
    requestLogger.js
    validation.js
  routes/
    notes.js
    users.js
  config/
    config.js
  tests/
    notes.test.js
  server.js
  .env.example
```

## Setup & Usage
1. Copy `.env.example` to `.env` and set a secure `JWT_SECRET`.
2. Install dependencies if needed: `npm install`.
3. Start the API: `npm start` (Slim equivalent: `php -S localhost:3000`).
4. Run smoke tests: `npm test` (Node's built-in `node --test`).

Notes:
- All `/notes` endpoints require `Authorization: Bearer <token>`.
- Notes are stored per authenticated user (in-memory) so users cannot read or mutate others' notes.
- Missing/invalid payloads return `400` with a JSON error message.

## TR Ozet
- Slim'deki routing/controller/middleware ayrimlarinin Express karsiliklari gosterildi.
- JWT dogrulamasi eklendi; not islemleri token olmadan yapilamaz.
- Notlar kullanici bazli tutulur (bellek ici); yanlis/eksik istekler 400 doner.

## Note
This project is for learning purposes only; data lives in memory. Future iterations can add a database (MongoDB/MySQL).

