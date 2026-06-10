# MERN Authentication App

A backend-focused MERN authentication service built with Node.js, Express, MongoDB, and JWT. It supports user registration, login, email verification, password reset, and token-based session handling.

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT authentication with cookie storage
- Email verification via OTP
- Password reset via OTP email
- MongoDB integration with Mongoose
- CORS support for frontend communication

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: nodemailer
- **Middleware**: cookie-parser, cors, dotenv

## Project Structure

```
MERN_AUTH/
├── client/                  # React frontend placeholder (not implemented)
├── server/
│   ├── config/
│   │   ├── mongodb.js      # MongoDB connection configuration
│   │   └── nodeMailer.js   # Nodemailer SMTP transporter
│   ├── Controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── userAuth.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── package.json        # Server dependencies and scripts
│   └── server.js           # Main Express server
└── README.md               # Project documentation
```

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

3. Create a `.env` file in the `server` directory with these variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   JWT_SECRET=your_jwt_secret_key
   SENDER_EMAIL=your_sender_email@example.com
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

4. Start MongoDB locally or connect to a hosted MongoDB cluster.

## Usage

1. Start the backend server:

   ```bash
   cd server
   npm run server
   ```

   For production mode:

   ```bash
   npm start
   ```

2. Default server address:

   ```
   http://localhost:4000
   ```

## API Endpoints

All authentication routes are mounted under `/api/auth`.

- `GET /` - Health check endpoint
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout and clear auth cookie
- `POST /api/auth/send-verify-otp` - Send account verification OTP (requires auth)
- `POST /api/auth/verify-account` - Verify account with OTP (requires auth)
- `POST /api/auth/is-authenticated` - Check auth status (requires auth)
- `POST /api/auth/send-reset-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password using OTP

## Notes

- The `client/` directory currently serves as a placeholder for a future React frontend.
- The backend uses cookies to store the JWT token and requires a valid `JWT_SECRET`.
- Email delivery is configured through SMTP with `nodemailer`.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them.
4. Push to your branch and open a pull request.

## License

This project is licensed under the ISC License.
