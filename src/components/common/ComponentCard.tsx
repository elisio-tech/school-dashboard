import Button from "../ui/button/Button";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Classes personalizadas para estilização
  desc?: string; // Texto descritivo opcional
  btn?: React.ReactNode | string; // Botão opcional
  click?: () => void; // Função opcional para o botão
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  btn = "",
  click = () => {}, // Função padrão vazia
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-center px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
        {btn && <Button onClick={click}>{btn}</Button>}
      </div>

      {/* Corpo do Card */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
