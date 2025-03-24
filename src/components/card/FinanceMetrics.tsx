import { useTheme } from "../../context/ThemeContext";
import { MoneyRecive } from "iconsax-react";

export default function FinanceStatistics() {
  const { theme } = useTheme();
  const incolor = theme === "dark" ? "#fff" : "#101828";
  const expenses = ["720102", "300212"];
  const totalFinance = expenses.reduce((acc, curr) => acc + parseInt(curr), 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">Total Finance</p>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ${totalFinance.toLocaleString()}
          </h1>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MoneyRecive size={24} color={incolor} variant="Bold" />
        </div>
      </div>
      <main className="grid grid-cols-[3fr_2fr] gap-1 mt-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div>
          70% (Income)
          <div className="w-full h-1 rounded-2xl bg-green-400 mt-2" />
        </div>
        <div>
          30% (Expenses)
          <div className="w-full h-1 rounded-2xl bg-yellow-600 mt-2" />
        </div>
      </main>
      <footer className="mt-8 flex gap-4 flex-wrap">
        {expenses.map((item, i) => (
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mr-2" key={i}>
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: i === 0 ? "green" : "orange" }} />
            ${parseInt(item).toLocaleString()}
          </div>
        ))}
      </footer>
    </div>
  );
}
