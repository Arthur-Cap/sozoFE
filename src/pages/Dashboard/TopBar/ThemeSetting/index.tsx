import React from "react";
import { useTopBar, ThemeType } from "../../../../contexts/TopBarContext";
import { Paintbrush, Bell } from "lucide-react";

const themeOptions: ThemeType[] = ["light", "dark", "white", "forest", "glass"];

interface ThemeSettingsProps {
  closeMenu: () => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ closeMenu }) => {
  const { theme, setTheme } = useTopBar();

  return (
    <div className="w-64 bg-white rounded-lg shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-bold text-gray-700">Settings</h2>
        <button onClick={closeMenu} className="text-xs text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-600 mb-1">
          <Paintbrush size={16} />
          <span className="text-sm font-medium">Theme</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-1">
          {themeOptions.map((option) => (
            <div
              key={option}
              className={`w-8 h-8 rounded cursor-pointer border-2 flex items-center justify-center transition-all ${
                theme === option ? "border-blue-500 scale-110" : "border-transparent"
              } bg-gray-100 hover:scale-110`}
              onClick={() => {
                setTheme(option);
                closeMenu();
              }}
            >
              <span className="text-[10px] capitalize text-gray-700">
                {option.slice(0, 1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-gray-600">
          <Bell size={16} />
          <span className="text-sm font-medium">Notification</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">Coming soon</div>
      </div>
    </div>
  );
};

export default ThemeSettings;