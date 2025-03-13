import { ArrowLeft, Eye, EyeSlash } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { z } from "zod";
import Select from "../form/Select";

const signUpSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório"),
  lastName: z.string().min(1, "O Sobrenome é obrigatório"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Por favor, insira um e-mail válido."),
  password: z
    .string()
    .min(1, "Password é obrigatória")
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(14, { message: "A senha não pode ter mais de 14 caracteres" }),
});

type RoleType = "admin" | "recepcionista" | "doutor";

interface Step {
  id: number;
  title: string;
  component: React.ReactNode;
}

export default function SignUpFormOne() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleType>("doutor");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { signUp, userData } = useAuth();
  const navigate = useNavigate();

  const options = [
    { value: "admin", label: "admin" },
    { value: "doutor", label: "doutor" },
    { value: "recepcionista", label: "recepcionista" },
  ];

  const handleSelectChange = (value: string) => {
    setRole(value as RoleType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const resulted = signUpSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });

    if (!resulted.success) {
      setError(resulted.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, firstName, lastName, role);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("erro ao criar conta");
    }
  };

  useEffect(() => {
    if (userData) {
      setLoading(false);
      navigate("/");
    }
  }, [userData, navigate]);

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

        <div>
         
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Primeiro passo
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Digite seu e-mail e senha para criar sua conta!
            </p>
          </div>
          <div>
            <form>
              {error && <p className="text-error-500 mb-2">{error}</p>}
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Nome<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Seu nome"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Sobre nome<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Seu sobre nome"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* <!-- Role --> */}
                <div>
                  <Label>
                    Tipo de usuário<span className="text-error-500">*</span>
                  </Label>
                  <Select
                    options={options}
                    placeholder="Selecionar"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Palavra-passe<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Sua palavra-passe"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <Eye
                          size={20}
                          color={theme === "dark" ? "#fff" : "#000"}
                        />
                      ) : (
                        <EyeSlash
                          size={20}
                          color={theme === "dark" ? "#fff" : "#000"}
                        />
                      )}
                    </span>
                  </div>
                </div>

                {/* <!-- Button --> */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    {loading ? "Carregando..." : "Próximo"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 mb-4">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                já tenho uma conta? {""}
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
