import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

const login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState("sign up");
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm-left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl text-font-semibold mb-3 text-center text-white">
          {state === "sign up" ? "Create Account" : "Login to Your Account"}
        </h2>
        <p className="text-sm mb-3 text-center ">
          {state === "sign up"
            ? "Create  Your Account"
            : "Login to Your Account"}
        </p>
        <form>
          <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
            <img src={assets.person_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5c] mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <h2  onClick={()=> navigate('/reset-password')} className="text-center text-white hover:text-blue-400 cursor-pointer">
            Forgot Password?
          </h2>
        </form>
      </div>
    </div>
  );
};

export default login;
