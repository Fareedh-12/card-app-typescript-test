import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import sun and moon icons

export default function LightDarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={toggleDarkMode}
        className={`relative w-20 h-10 rounded-full p-1 cursor-pointer 
                ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`} // Toggle background based on mode
      >
        <div
          className={`absolute w-8 h-8 rounded-full transition-transform duration-300 
                    ${isDarkMode ? "translate-x-10 bg-gray-800" : "translate-x-0 bg-yellow-500"}`} // Switch position
        ></div>
      </div>
    </div>
  );
}
