# MERN Authentication App

A backend-focused MERN authentication service built with Node.js, Express, MongoDB, and JWT. The app provides secure user onboarding, login, email verification, password reset, and protected user data access.

## What this app does

- Registers users with hashed passwords.
- Logs users in and stores a JWT token in an HTTP-only cookie.
- Verifies user accounts by sending a one-time OTP email.
- Sends password reset OTP emails and updates the password securely.
- Protects routes using JWT cookie-based authentication.
- Exposes a small authenticated user profile endpoint.

## Project Structure

```
MERN_AUTH/
├── client/                         # Placeholder for future React frontend
├── server/                         # Backend server application
│   ├── config/
│   │   ├── mongodb.js              # MongoDB connection logic, connects to the `mern-auth` database
│   │   └── nodeMailer.js           # Nodemailer SMTP transporter configuration
│   ├── Controllers/
│   │   ├── authController.js       # Registration, login, logout, OTP, verification, reset password flows
│   │   └── userController.js       # Fetch authenticated user profile data
│   ├── middleware/
│   │   └── userAuth.js             # Validates JWT cookie and attaches `userId` to requests
│   ├── models/
│   │   └── userModel.js            # Mongoose schema for users, OTPs, and verification state
   │
│   ├── routes/
│   │   ├── authRoutes.js           # `/api/auth` routes for auth-related actions
│   │   └── userRoute.js            # `/api/user` route for protected user data
│   ├── package.json                # Server dependencies and run scripts
│   └── server.js                   # Express app setup, middleware, and route registration
└── README.md                       # Project documentation
```

## File and Folder Details

- `server/server.js`
  - Starts Express on the configured port.
  - Connects to MongoDB.
  - Enables JSON parsing, cookies, and CORS.
  - Registers `/api/auth` and `/api/user` routes.

- `server/config/mongodb.js`
  - Connects to MongoDB using `process.env.MONGODB_URI`.
  - Prints a success message when the database connects.

- `server/config/nodeMailer.js`
  - Creates a Nodemailer transporter for SMTP email delivery.
  - Uses `SMTP_USER` and `SMTP_PASS` from environment variables.

- `server/models/userModel.js`
  - Defines the user schema.
  - Stores hashed passwords, OTP values, verification status, and expiry data.

- `server/middleware/userAuth.js`
  - Reads the `token` cookie.
  - Verifies the JWT with `JWT_SECRET`.
  - Adds `userId` to `req.body` for protected routes.

- `server/Controllers/authController.js`
  - `register`: creates a user, hashes password, issues JWT cookie, sends welcome email.
  - `login`: verifies credentials, issues JWT cookie.
  - `logout`: clears the auth cookie.
  - `sendVerifyEmail`: generates and emails account verification OTP.
  - `verifyOtp`: validates OTP and marks the account verified.
  - `isAuthenticated`: returns success for authenticated requests.
  - `sendResetOtp`: sends password reset OTP to the user email.
  - `resetPassword`: verifies OTP and updates the password.

- `server/Controllers/userController.js`
  - `getUserData`: returns the authenticated user's name and verification status.

- `server/routes/authRoutes.js`
  - Mounts auth API routes and applies `userAuth` where needed.

- `server/routes/userRoute.js`
  - Exposes a protected `/api/user/data` endpoint.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd MERN_AUTH
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in `server/` with:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   JWT_SECRET=your_jwt_secret_key
   SENDER_EMAIL=your_sender_email@example.com
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

4. Run MongoDB locally or connect to a cloud MongoDB instance.

## Run the app

Start the backend in development mode:

```bash
cd server
npm run server
```

Production mode:

```bash
npm start
```

Server URL:

```text
http://localhost:4000
```

## API Endpoints

### Health

- `GET /` – Returns a simple "API is Running" response.

### Authentication

- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Login with email and password.
- `POST /api/auth/logout` – Logout and clear auth cookie.

### Account verification

- `POST /api/auth/send-verify-otp` – Send verification OTP to the logged-in user.
- `POST /api/auth/verify-account` – Verify account with OTP.
- `POST /api/auth/is-authenticated` – Check whether the current JWT cookie is valid.

### Password reset

- `POST /api/auth/send-reset-otp` – Send a password reset OTP to email.
- `POST /api/auth/reset-password` – Change password using the reset OTP.

### Protected user data

- `GET /api/user/data` – Returns authenticated user profile details.

## Outcome

Once configured and running, this backend allows users to:

- create an account and receive a welcome email,
- log in securely using JWT stored in an HTTP-only cookie,
- verify their account with an OTP email,
- request a password reset OTP and update their password,
- access a protected profile endpoint when authenticated.

The `client/` folder is currently a placeholder for a future frontend integration.

## Notes

- Email functionality requires valid SMTP credentials.
- JWT and MongoDB connection values must be set in the `.env` file.
- The app is currently backend-first; frontend implementation is not included.

## License

ISC
