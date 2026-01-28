# Job Portal - Frontend

A modern job portal application built with React and Vite, featuring a responsive UI for job seekers and recruiters.

## 📋 Features

- **Job Listings**: Browse and search available job positions
- **Job Applications**: Apply for jobs with a simple interface
- **User Dashboard**: Track your job applications
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI Components**: Includes navigation, hero section, job cards, and footer
- **Authentication**: Recruiter login functionality

## 🛠️ Tech Stack

- **React 18** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend build tool
- **CSS3** - Styling and responsive layouts
- **Context API** - State management

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── AppDownload.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── JobCard.jsx
│   ├── JobListing.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   └── RecruiterLogin.jsx
├── pages/              # Page components
│   ├── Applications.jsx
│   ├── Applyjob.jsx
│   └── Home.jsx
├── context/            # Context for state management
│   └── AppContext.jsx
├── assets/             # Static assets
│   └── assets.js
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## 📦 Dependencies

- React - UI library
- Vite - Build tool
- ESLint - Code quality tool

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
