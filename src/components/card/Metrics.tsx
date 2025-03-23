import { ArrowDown, ArrowUp, Direct, User, MoneySend } from "iconsax-react";
import Badge from "../ui/badge/Badge";
import { useTheme } from "../../context/ThemeContext";

export default function Metrics() {
  const { theme } = useTheme();
  const incolor = theme === "dark" ? "#fff" : "#101828";
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 mb-14">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <User size={24} color={incolor} variant="Bold" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total of students
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            541
            </h4>
          </div>
          <Badge color="success">
            <ArrowUp size={14} color={incolor} />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MoneySend size={24} color={incolor} variant="Bold" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
               Teacher in school
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              12
            </h4>
          </div>

          <Badge color="error">
            <ArrowDown size={14} color={incolor} />
            1.05%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Direct size={24} color={incolor} variant="Bold" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              All Courses  
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              34
            </h4>
        
          </div>
          <Badge color="success">
            <ArrowUp size={14} color={incolor} />
            11.01%
          </Badge>
        </div>
      </div>
    </div>
  );
}