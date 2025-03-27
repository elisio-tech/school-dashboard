import { Medal } from "iconsax-react";
import { useTheme } from "../../context/ThemeContext";

export default function StudentStatistics() {
  const { theme } = useTheme();
  const incolor = theme === "dark" ? "#fff" : "#101828";

  // Notas simuladas de alunos
  const scores = [14.9, 10.5, 10.3, 19.8, 17.0, 12.2, 17.5, 11.0, 9.2, 15.3];

  // Cálculo da média
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Contagem de alunos por categoria
  const categories = { bom: 0, medio: 0, mau: 0 };
  scores.forEach((score) => {
    if (score >= 15) categories.bom++;
    else if (score >= 10) categories.medio++;
    else categories.mau++;
  });

  // Convertendo para porcentagem
  const totalAlunos = scores.length;
  const percentages = {
    bom: Math.round((categories.bom / totalAlunos) * 100),
    medio: Math.round((categories.medio / totalAlunos) * 100),
    mau: Math.round((categories.mau / totalAlunos) * 100),
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
            Média dos alunos
          </p>
          <h1 className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
            {averageScore.toFixed(1)} / 20
          </h1>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Medal size={24} color={incolor} variant="Bold" />
        </div>
      </div>
     
<main className="w-full mt-4 text-xs text-gray-500 dark:text-gray-400">
  <div className="grid gap-1" style={{ gridTemplateColumns: `${percentages.bom}% ${percentages.medio}% ${percentages.mau}%` }}>
    <div >
        <span>{percentages.bom}%</span>
    <div className="mt-2 h-1 bg-green-400 rounded-2xl" />
    </div>
    <div>
    <span>{percentages.medio}%</span>
    <div className="mt-2 h-1 bg-yellow-600 rounded-2xl" />
    </div>
    <div>
     <span>{percentages.mau}%</span>
    <div className="mt-2 h-1 bg-red-500 rounded-2xl" />
    </div>
  </div>
</main>





      <footer className="mt-8 flex gap-4 flex-wrap">
        {["Bom", "Médio", "Mau"].map((item, i) => (
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

