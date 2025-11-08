# Tech stack (concise)

A short, copy-paste-ready summary of the technologies used in this project.

## Overview
- Project type: Full-stack web application (single-repo: `client/` + `server/`).
- Languages: JavaScript (ES6+) and JSX.
- Frontend framework: React (Create React App).
- Backend: Node.js + Express.
- Database: MongoDB (Mongoose used for models).

## Frontend (client/)
- React 18 (functional components & hooks)
- Create React App (`react-scripts`) for dev/build tooling
- Routing: `react-router-dom` (v6)
- Styling: `styled-components` (CSS-in-JS)
- Animations: `framer-motion`
- Forms & date UI: `react-hook-form`, `react-datepicker`, `react-calendar`
- HTTP client: `axios` (for API calls to server)
- Icons & UI helpers: `react-icons`, `react-toastify` (toasts)
- Testing helpers (optional): `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- Dev-time proxy: client `package.json` proxies API calls to `http://localhost:5001` in development.

Primary frontend files:
- `client/src/App.js`, `client/src/index.js`
- Pages: `client/src/pages/*` (e.g., `Instructors.js`, `Home.js`, `Booking.js`)
- Components: `client/src/components/*`
- Auth context: `client/src/context/AuthContext.js`

## Backend (server/)
- Node.js runtime
- Express.js web framework
- Database: MongoDB (driver + Mongoose for schema & models)
- Authentication: JWT (`jsonwebtoken`) + password hashing (`bcryptjs`)
- Validation: `express-validator`
- File uploads: `multer` (multipart/form-data)
- Email: `nodemailer`
- Payments: `stripe` (server-side integration)
- HTTP client: `axios` (server-side requests)
- Dev auto-reload: `nodemon` (dev dependency)

Primary backend files:
- `server/index.js` (app entry)
- Routes: `server/routes/*` (`auth.js`, `instructors.js`, `courses.js`, `bookings.js`, `payments.js`, etc.)
- Models: `server/models/*` (`User.js`, `Instructor.js`, `Course.js`, `Booking.js`, `AuditLog.js`)
- Middleware: `server/middleware/*` (`auth.js`, `upload.js`)

## Persisted data
- MongoDB collections via Mongoose models (`server/models/`).
- Typical models: User, Instructor, Course, Booking, AuditLog.

## Notable packages & versions (from package.json)
- Frontend: react@^18.2.0, react-dom@^18.2.0, react-router-dom@^6.18.0, styled-components@^6.1.1, framer-motion@^10.x, axios@^1.6.x
- Backend: express@^4.18.x, mongoose@^8.x, mongodb@^6.20.x, jsonwebtoken@^9.x, bcryptjs@^2.4.x, multer@^1.4.x, nodemailer@^6.9.x, stripe@^14.x, dotenv
- Root tooling: concurrently (used to run client+server in dev)

## Developer tools & scripts
- Root scripts (in `package.json`):
  - `npm run dev` — runs server and client concurrently
  - `npm run build` — builds the client
  - `npm run install-all` — installs dependencies in root, server, client
- Server scripts:
  - `npm run dev` (nodemon) and `npm start`
- Frontend scripts (Create React App): `npm start`, `npm run build`, `npm test`

## Environment & config
- Environment variables via `dotenv` (server `.env` expected).
- Example server env variables: `MONGODB_URI`, `JWT_SECRET`, `PORT`, `EMAIL_USER`, `EMAIL_PASS`, `STRIPE_SECRET_KEY`.

## Where to look in the repo
- Frontend: `client/src/` (pages, components, context)
- Backend: `server/` (models, routes, middleware)
- Entry points: `client/src/index.js`, `server/index.js`

## Quick run (dev)
1. Install everything:

```powershell
npm run install-all
```

2. Start both dev servers from repo root:

```powershell
npm run dev
```

3. Frontend: http://localhost:3000 (Create React App)
   Backend: check `server/index.js` for configured port (commonly 5000/5001)

## Notes & recommendations
- Client-side API proxy is configured in `client/package.json`; ensure server port matches the proxy when developing.
- Sensitive keys (JWT secret, DB URI, Stripe keys) must go in the server `.env` and never be committed.
- Tests are set up with Testing Library but may need authoring/coverage.

---

This file is intentionally concise — paste the content under a "Tech stack" or "Technology" section in your `README.md` if you prefer a single-file README.
