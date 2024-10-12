import { NavLink } from "react-router-dom";
import LightDarkModeSwitch from "./LightDarkModeSwitch"; // Import the dark mode switch

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-5 items-center p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <LightDarkModeSwitch />
    </nav>
  );
}
