import { Moon, Sun1 } from "iconsax-react";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggleButton: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      <div className="hidden dark:block">
        <Sun1
          size="20"
          color={theme === "dark" ? "#fff" : "#101828"}
          variant="Bold"
        />
      </div>
      <div className="dark:hidden">
        <Moon
          size="20"
          color={theme === "dark" ? "#fff" : "#101828"}
          variant="Bold"
        />
      </div>
    </button>
  );
};
