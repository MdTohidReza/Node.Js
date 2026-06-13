import React from 'react'
import {assets} from '../assets/assets.js'

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 text-center px-4 text-gray-800">
      <img
        src={assets.header_img}
        alt="Logo"
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex item-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey Developers
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome To Our MERN-AUTH App
      </h2>

      <p className="mb-6 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <button className="border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
}

export default Header