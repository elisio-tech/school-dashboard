import { ArrowDown, ArrowUp, Direct, User, Airplane } from "iconsax-react";
import Badge from "../ui/badge/Badge";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { Teacher } from "../../types/type";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Metrics() {
  const [teacher, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teachers"), (snapshot) => {
      const teacher = snapshot.docs.map((doc) => ({
        ...(doc.data() as Teacher),
        id: doc.id,
      }));

      setTeachers(teacher);
    });

    return () => unsubscribe();
  }, [])


  const { theme } = useTheme();
  const incolor = theme === "dark" ? "#fff" : "#101828";
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 mb-8">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-800">
          <User size={24} color={incolor} variant="Bold" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de estudentes
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              541
            </h4>
          </div>
          <Badge color="success">
            <div className="animate-bounce duration-100">
              <ArrowUp size={14} color={incolor} />
            </div>
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-800">
          <Airplane size={24} color={incolor} variant="Bold" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de professores
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              { teacher.length }
            </h4>
          </div>

          <Badge color="error">
            <div className="animate-bounce duration-100">
              <ArrowDown size={14} color={incolor} />
            </div>
            1.05%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-800">
          <Direct size={24} color={incolor} variant="Bold" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Cursos ministrados
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              11
            </h4>
          </div>
          <Badge color="success">
            <div className="animate-bounce duration-100">
              <ArrowUp size={14} color={incolor} />
            </div>
            10.01%
          </Badge>
        </div>
      </div>
    </div>
  );
}
