import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/job-portal")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));
};

export default connectDB;


// sentry is the application monitoring and error tracking tool that helps developers identify and fix issues in their applications.
// It provides real-time insights into errors, performance issues, and other critical events, allowing developers to quickly address problems and improve the overall user experience.
// Sentry supports various programming languages and frameworks, making it a versatile solution for monitoring applications across different platforms.
