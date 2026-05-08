# MERN Authentication App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for user authentication, including registration, login, and secure token-based authentication.

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT (JSON Web Token) authentication
- Email verification using nodemailer
- Cookie-based session management
- CORS enabled for cross-origin requests
- MongoDB database integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer
- **Other**: CORS, cookie-parser, dotenv

## Project Structure

```
MERN_AUTH/
├── client/          # React frontend (not implemented yet)
├── server/
│   ├── config/
│   │   └── mongodb.js  # MongoDB connection configuration
│   ├── package.json    # Server dependencies and scripts
│   └── server.js       # Main server file
└── README.md           # Project documentation
```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd MERN_AUTH
   ```

2. Install server dependencies:

   ```
   cd server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the MongoDB server (ensure MongoDB is installed and running).

## Usage

1. Start the server:

   ```
   cd server
   npm run server  # Uses nodemon for development
   ```

   Or for production:

   ```
   npm start
   ```

2. The server will run on `http://localhost:4000` (or the port specified in `.env`).

3. API endpoints:
   - `GET /`: Check if API is running

   (Additional endpoints for authentication will be added as the project develops.)

## Frontend Setup

The React frontend in the `client` directory is not implemented yet. To set up the client:

1. Navigate to the client directory:

   ```
   cd client
   ```

2. Initialize a React app (if not already done):

   ```
   npx create-react-app .
   ```

3. Install necessary dependencies (e.g., axios for API calls).

4. Implement authentication components and connect to the backend API.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the ISC License.
