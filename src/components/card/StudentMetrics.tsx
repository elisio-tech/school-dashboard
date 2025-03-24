import { Medal } from "iconsax-react";
import { useTheme } from "../../context/ThemeContext";

export default function StudentStatistics() {
  const { theme } = useTheme();
  const incolor = theme === "dark" ? "#fff" : "#101828";
  const status = ["Passed", "Failed", "Dropped Out"];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
            Student Statistics
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            70% <span className="font-normal text-xs">Passed</span>
          </h1>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Medal size={24} color={incolor} variant="Bold" />
        </div>
      </div>
      <main className="grid grid-cols-[3fr_2fr_1fr] gap-1 mt-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div>
          70%
          <div className="w-full h-1 rounded-2xl bg-green-400 mt-2" />
        </div>
        <div>
          20%
          <div className="w-full h-1 rounded-2xl bg-yellow-600 mt-2" />
        </div>
        <div>
          10%
          <div className="w-full h-1 rounded-2xl bg-red-500 mt-2" />
        </div>
      </main>
      <footer className="mt-8 flex gap-4 flex-wrap">
        {status.map((item, i) => (
          <div
            className="flex items-center text-sm text-gray-700 dark:text-gray-300 mr-2"
            key={i}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                i === 0
                  ? "bg-green-400"
                  : i === 1
                  ? "bg-yellow-600"
                  : "bg-red-500"
              }`}
            />
            {item}
          </div>
        ))}
      </footer>
    </div>
  );
}
