import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

import { InfoCircle, LoginCurve, User } from "iconsax-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useTheme();
  const { user, userData, signOutUser } = useAuth();
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/entrar");
    } catch (error) {
      console.log("Erro ao sair", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-300 dropdown-toggle dark:text-gray-700"
      >
        <span className="mr-3 toverflow-hidden  text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white  flex items-center justify-center   text-lg font-semibold uppercase">
          {userData && userData.photoURL ? (
            <img
              src={userData.photoURL}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : userData && userData.email ? (
            <span className="text-gray-700  dark:text-gray-400 ">{userData.firstName.charAt(0).toUpperCase()}</span>
          ) : (
            <span>?</span>
          )}
        </span>
        <svg
          className={`stroke-gray-700 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {userData ? `${userData.firstName} ${userData.lastName}` : "user"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user ? user?.email : "julho@gmail.com"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <User
                variant="Bold"
                size={20}
                color={theme === "dark" ? "#fff" : "#102818"}
              />
              Editar perfil
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <InfoCircle
                variant="Bold"
                size={20}
                color={theme === "dark" ? "#fff" : "#102818"}
              />
              Suporte técnico
            </DropdownItem>
          </li>
        </ul>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 dark:bg-gray-500 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LoginCurve
            variant="Bold"
            size={20}
            color={theme === "dark" ? "#fff" : "#102818"}
          />
          Sair
        </button>
      </Dropdown>
    </div>
  );
}
