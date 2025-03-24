import FinanceStatistics from "./FinanceMetrics";
import StudentStatistics from "./StudentMetrics";


export default function Money() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:gap-6 mb-14">
      <StudentStatistics />
      <FinanceStatistics />
    </div>
  );
}
