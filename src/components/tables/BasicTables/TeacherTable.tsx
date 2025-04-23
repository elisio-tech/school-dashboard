import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useEffect, useState } from "react";
import { Teacher } from "../../../types/type";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

export default function TeacherTable() {
  const [teacher, setTeacher] = useState<Teacher[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teachers"), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        ...(doc.data() as Teacher),
        id: doc.id,
      }));

      setTeacher(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[910px]">
          <Table>
            {/* Cabeçalho da Tabela */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nome
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Disciplinas
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Telefone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Corpo da Tabela */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {teacher.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={user.photo}
                          alt={user.name}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="flex font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.name}
                        </p>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.age} anos
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.subjects.map((item) => (
                      <span key={item} className="mr-2">{item}</span>
                    ))}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.phone}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
