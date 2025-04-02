import React, { useEffect, useState } from "react";

const messages = [
  "Welcome to Sozo",
  "Let’s create something amazing",
  "Need help? I’m here",
  "Keep pushing forward",
];

const TopBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed border border-white top-4 left-1/2 transform flex justify-between -translate-x-1/2 bg-[#fcf1e7] rounded-full flex items-center px-4 py-2 w-[90%] max-w-[130px] sm:max-w-[450px] z-50"
      style={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <img
        src="src\\assets\\image-removebg (1).png"
        alt="icon"
        className="h-7 sm:mr-3"
      />

      <div
        className={`flex-1 px-4 py-2 rounded-full outline-none text-gray-700 hidden sm:inline transition-all duration-500 ease-in-out ${
          fade ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {messages[index]}
      </div>

      <div className="relative sm:ml-3 flex items-center">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <img
            src="src\\assets\\mockAvt.png"
            alt="avatar"
            className="h-7 w-7 rounded-full"
          />
        </button>

        {menuOpen && (
          <div className="absolute right-[0px] bottom-[-140px] mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
