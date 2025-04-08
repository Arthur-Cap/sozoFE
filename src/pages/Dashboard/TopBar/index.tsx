import React, { useEffect, useState } from "react";
import "./TopBar.css";
import { useTopBar } from "../../../contexts/TopBarContext";
import ThemeSettings from "./ThemeSetting";

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
    onClick: "open-theme-settings",
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
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  const { topBarState, setTopBarState, theme } = useTopBar();

  const lightThemes = ["light", "white"];
  const isLightTheme = lightThemes.includes(theme);

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
    if (menuOpen) setShowMenu(true);
    else {
      const timeout = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  useEffect(() => {
    setIsNotifying(true);
    const timer = setTimeout(() => setIsNotifying(false), 3000);
    return () => clearTimeout(timer);
  }, [topBarState]);

  useEffect(() => {
    setTopBarState({
      backgroundImage:
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg",
      backgroundColor: "#0060dc",
      title: `Welcome back, `,
    });
  }, []);

  const themeStyle =
    theme === "white"
      ? {
          background: "rgb(255, 255, 255)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(20px)",
        }
      : theme === "dark"
      ? {
          background: "rgba(30, 30, 30, 0.8)",
          color: "#fff",
        }
      : theme === "forest"
      ? {
          background: "rgba(34, 49, 35, 0.6)",
          backdropFilter: "blur(10px)",
        }
      : theme === "glass"
      ? {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
        }
      : {
          background: "linear-gradient(to right, #fff0df, #fff8f4)",
        };

  const notifyingStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.14)), url("${topBarState.backgroundImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div
        className={`
          fixed border border-white/40 top-4 left-1/2 transform -translate-x-1/2 
          flex justify-between items-center px-4 py-2 w-[90%] 
          rounded-full z-50 transition-all duration-500 ease-in-out
          ${
            isNotifying
              ? "sm:max-w-[700px] h-[70px]"
              : "sm:max-w-[450px] max-w-[130px] h-[55px]"
          }
        `}
        style={{
          ...(!isNotifying ? themeStyle : notifyingStyle),
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
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
              : isLightTheme
              ? "/assets/image-removebg (1).png"
              : "/assets/image-removebg.png"
          }
          alt="icon"
          className="h-7 sm:mr-3"
        />

        {isNotifying ? (
          <div>
            <div className="max-w-full py-2 text-xs sm:text-[15px] text-white">
              <strong>{topBarState.title}</strong>
            </div>
          </div>
        ) : (
          <div
            className={`max-w-full px-4 py-2 hidden sm:inline transition-all duration-500 ease-in-out ${
              fade ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
            } ${isLightTheme ? "text-black" : "text-white"}`}
          >
            {messages[index]}
          </div>
        )}

        <div className="relative sm:ml-3 flex items-center">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
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
            <div className="absolute right-0 top-12 w-48 bg-white text-black rounded-md shadow-lg z-50">
              {menuOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    if (option.onClick === "open-theme-settings") {
                      setShowSettingsPopup(true);
                      setMenuOpen(false);
                    } else if (typeof option.onClick === "function") {
                      option.onClick();
                      setMenuOpen(false);
                    }
                  }}
                >
                  {option.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showSettingsPopup && (
        <div className="fixed top-20 right-4 z-50">
          <ThemeSettings closeMenu={() => setShowSettingsPopup(false)} />
        </div>
      )}
    </>
  );
};

export default TopBar;
