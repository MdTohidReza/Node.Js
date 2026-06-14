import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContent } from "../context/AppContext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContent);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true
      if(state === 'Sign Up')
      {
          const {data} = await axios.post(backendUrl + '/api/auth/register', {name,email,password})
          if (data.success) {
            setIsLoggedIn(true);
            navigate("/");
          } else {
            toast.error(data.Message);
          }
      }
            
      else
      {
          const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password})
          console.log("login response:", data);
          
          if (data.success) {
            setIsLoggedIn(true);
            navigate("/");
          } else {
            toast.error(data.Message);
          }
      }

    } catch (error) {
      toast.error(error.Message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm-left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl text-font-semibold mb-3 text-center text-white">
          {state === "Sign Up" ? "Create Account" : "Login to Your Account"}
        </h2>
        <p className="text-sm mb-3 text-center ">
          {state === "Sign Up"
            ? "Create  Your Account"
            : "Login to Your Account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <h2
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </h2>

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full py-3 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-center text-gray-400 text-xs">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-400 text-xs">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
