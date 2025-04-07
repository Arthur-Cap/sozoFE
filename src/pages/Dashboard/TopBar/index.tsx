import React, { useEffect, useState } from "react";
import "./TopBar.css";
import { useTopBar } from "../../../contexts/TopBarContext";

const messages = [
  "Welcome to Sozo",
  "Let’s create something amazing",
  "Need help? I’m here",
  "Keep pushing forward",
];

const menuOptions = [
  {
    title: "Profile",
    onClick: () => console.log("Profile clicked"),
  },
  {
    title: "Settings",
    onClick: () => console.log("Settings clicked"),
  },
  {
    title: "Logout",
    onClick: () => {
      localStorage.clear();
      location.reload();
    },
  },
];

const TopBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { state } = useTopBar();

  const [isNotifying, setIsNotifying] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      setShowMenu(true);
    } else {
      const timeout = setTimeout(() => {
        setShowMenu(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  useEffect(() => {
    setIsNotifying(true);
    const timer = setTimeout(() => {
      setIsNotifying(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [state]);

  const { setTopBarState } = useTopBar();

  useEffect(() => {
    setTopBarState({
      backgroundImage:
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      backgroundColor: "#0060dc",
      title: `Welcome back, `,
    });
  }, []);

  return (
    <div
      className={`
        fixed border border-white top-4 left-1/2 transform -translate-x-1/2 
        flex justify-between items-center px-4 py-2 w-[90%] 
        rounded-full z-50 transition-all duration-500 ease-in-out
        ${
          isNotifying
            ? "sm:max-w-[700px] h-[70px]"
            : "sm:max-w-[450px] max-w-[130px] h-[55px]"
        }
      `}
      style={{
        backgroundImage: isNotifying
          ? `linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url("${state.backgroundImage}")`
          : "linear-gradient(to right, #fff0df, #fff8f4)",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {isNotifying && (
        <div className="star-container">
          {Array.from({ length: 25 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const size = Math.random() * 3 + 2;
            return (
              <div
                key={i}
                className="star"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      <img
        src={
          isNotifying
            ? "/assets/image-removebg.png"
            : "/assets/image-removebg (1).png"
        }
        alt="icon"
        className="h-7 sm:mr-3"
      />

      {isNotifying ? (
        <div>
          <div
            className="max-w-full py-2 rounded-full outline-none text-xs sm:text-[15px] text-white transition-all  duration-500 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: "100%" }}
          >
            <strong>{state.title}</strong>
          </div>
        </div>
      ) : (
        <div
          className={`max-w-full px-4 py-2 rounded-full outline-none text-gray-700 hidden overflow-hidden sm:inline transition-all duration-500 ease-in-out ${
            fade ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {messages[index]}
        </div>
      )}

      <div className="relative sm:ml-3 flex items-center">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <img
            src="/assets/mockAvt.png"
            alt="avatar"
            className={`rounded-full transition-all duration-500 ease-in-out ${
              isNotifying
                ? "border-white border-2 h-10 w-10"
                : "border-none h-8 w-8"
            }`}
          />
        </button>

        {showMenu && (
          <div
            className={`absolute right-0 bottom-[-140px] mt-2 w-40 bg-white rounded-md shadow-lg z-50 ${
              menuOpen ? "fade-in-down" : "fade-out-up"
            }`}
          >
            {menuOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={option.onClick}
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
