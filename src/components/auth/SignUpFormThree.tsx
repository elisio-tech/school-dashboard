import { ArrowLeft } from "iconsax-react";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { useTheme } from "../../context/ThemeContext";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { z } from "zod";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";

const Schema = z.object({
  course: z.string().min(1, "O curso é obrigatório"),
  area: z.string().min(1, "A area academica é obrigatória"),
  date: z.string().min(1, "O Ano letivo é obrigatório"),
  file: z.custom<File | undefined>((file) => {
    if (!file) return true;
    return file.type.startsWith("image/");
  }, "O arquivo deve ser uma imagem"),
});

export default function UserInfo() {
  const [course, setCourse] = useState("");
  const [area, setArea] = useState("");

  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const courseOptions = [
    { value: "Ensino Médio", label: "Ensino Médio" },
    { value: "Ensino Superior", label: "Ensino Superior" },
  ];

  const areaOptions = [
    { value: "Análises Clínicas", label: "Análises Clínicas" },
    { value: "Direito", label: "Direito" },
    { value: "Mecânica", label: "Mecânica" },
    { value: "Administração", label: "Administração" },
  ];

  const handleCourseChange = (value: string) => {
    setCourse(value);
  };

  const handleAreaChange = (value: string) => {
    setArea(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setError("Por favor, selecione um arquivo.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("O arquivo deve ser uma imagem.");
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = Schema.safeParse({
      course,
      area,
      date,
      file,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex justify-between w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/entrar"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ArrowLeft size={24} color={theme === "dark" ? "#fff" : "#101828"} />
          Voltar
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Finalizar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Forneça seus dados pessoais para prosseguir com o cadastro
            </p>
          </div>
          <div>
            <form>
              {error && <p className="text-error-500 mb-2">{error}</p>}
              <div className="space-y-5">
                <div className="sm:col-span-1">
                  <Label>
                    Curso<span className="text-error-500">*</span>
                  </Label>
                  <Select
                    options={courseOptions}
                    placeholder="Selecionar"
                    defaultValue={course}
                    onChange={handleCourseChange}
                    className="dark:bg-dark-900"
                  />
                </div>

                <div>
                  <Label>
                    Área Acadêmica<span className="text-error-500">*</span>
                  </Label>
                  <Select
                    options={areaOptions}
                    placeholder="Selecionar"
                    defaultValue={area}
                    onChange={handleAreaChange}
                    className="dark:bg-dark-900"
                  />
                </div>

                {/* Data de nascimento */}
                <div>
                  <Label>
                    Ano letivo<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="AAAA"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Fotografia */}
                <div>
                  <Label>
                    Certificado<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <FileInput onChange={handleFileChange} />
                  </div>
                </div>

                {/* Botão de envio */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    {loading ? "Carregando..." : "Fazer inscrição"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 mb-4">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Já tem uma conta?{" "}
                <Link
                  to="/entrar"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
