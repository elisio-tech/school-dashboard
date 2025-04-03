import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Consulta {
  id: number;
  paciente: {
    imagem: string;
    nome: string;
    idade: string;
  };
  servico: string;
  medico: {
    imagem: string;
    nome: string;
    especialidade: string;
  };
  status: string;
  preco: string;
}

// Dados da tabela
const consultas: Consulta[] = [
  {
    id: 1,
    paciente: {
      imagem: "/images/user/user-08.jpg",
      nome: "Mariana Silva",
      idade: "28 anos",
    },
    servico: "Consulta de Rotina",
    medico: {
      imagem: "/images/user/user-12.jpg",
      nome: "Dr. Pedro Souza",
      especialidade: "Clínico Geral",
    },
    preco: "R$ 250,00",
    status: "Confirmada",
  },
  {
    id: 2,
    paciente: {
      imagem: "/images/user/user-04.jpg",
      nome: "Carlos Mendes",
      idade: "35 anos",
    },
    servico: "Ortopedia",
    medico: {
      imagem: "/images/user/user-09.jpg",
      nome: "Dra. Ana Costa",
      especialidade: "Ortopedista",
    },
    preco: "R$ 320,00",
    status: "Agendada",
  },
  {
    id: 3,
    paciente: {
      imagem: "/images/user/user-01.jpg",
      nome: "Fernanda Lima",
      idade: "42 anos",
    },
    servico: "Cardiologia",
    medico: {
      imagem: "/images/user/user-02.jpg",
      nome: "Dr. Lucas Martins",
      especialidade: "Cardiologista",
    },
    preco: "R$ 400,00",
    status: "Confirmada",
  },
  {
    id: 4,
    paciente: {
      imagem: "/images/user/user-03.jpg",
      nome: "João Pereira",
      idade: "50 anos",
    },
    servico: "Dermatologia",
    medico: {
      imagem: "/images/user/user-03.jpg",
      nome: "Dra. Carla Fernandes",
      especialidade: "Dermatologista",
    },
    preco: "R$ 280,00",
    status: "Cancelada",
  },
];

export default function TeacherTable() {
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
                  Paciente
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Serviço
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Médico
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Preço
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Corpo da Tabela */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {consultas.map((consulta) => (
                <TableRow key={consulta.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={consulta.paciente.imagem}
                          alt={consulta.paciente.nome}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {consulta.paciente.nome}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {consulta.paciente.idade}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {consulta.servico}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={consulta.medico.imagem}
                          alt={consulta.medico.nome}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {consulta.medico.nome}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {consulta.medico.especialidade}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        consulta.status === "Confirmada"
                          ? "success"
                          : consulta.status === "Agendada"
                          ? "warning"
                          : "error"
                      }
                    >
                      {consulta.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {consulta.preco}
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
