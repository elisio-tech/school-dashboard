import { ArrowLeft, Eye, EyeSlash } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useAuth } from "../../context/UserContext";
import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório"),
  lastName: z.string().min(1, "O sobrenome é obrigatório"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Por favor, insira um e-mail válido."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(14, "A senha não pode ter mais de 14 caracteres"),
});

type ErrorType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  auth?: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { signUp, userData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const resulted = signUpSchema.safeParse({ firstName, lastName, email, password });

    if (!resulted.success) {
      const formattedErrors = resulted.error.format();
      setError({
        firstName: formattedErrors.firstName?._errors[0],
        lastName: formattedErrors.lastName?._errors[0],
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, firstName, lastName);
    } catch (error : any) {
      setError({ auth: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto overflow-y-auto lg:w-1/2 no-scrollbar">
      <div>
        <div className="flex justify-between w-full max-w-md mx-auto mb-5 sm:pt-10">
          <Link
            to="/entrar"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft size={24} color={theme === "dark" ? "#fff" : "#101828"} />
            Voltar
          </Link>
        </div>

        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Criar conta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Introduza seus dados para concluir o cadastro!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {error?.auth && <p className="text-error-500 mb-2 text-xs">{error.auth}</p>}
              <div className="space-y-5">
                {/* Nome */}
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
                    error={!!error?.firstName}
                    hint={error?.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Sobrenome */}
                <div className="sm:col-span-1">
                  <Label>
                    Sobrenome<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Seu sobrenome"
                    value={lastName}
                    error={!!error?.lastName}
                    hint={error?.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Seu e-mail"
                    value={email}
                    error={!!error?.email}
                    hint={error?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Palavra-passe */}
                <div>
                  <Label>
                    Palavra-passe<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Sua palavra-passe"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      error={!!error?.password}
                      hint={error?.password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <Eye size={20} color={theme === "dark" ? "#fff" : "#000"} />
                      ) : (
                        <EyeSlash size={20} color={theme === "dark" ? "#fff" : "#000"} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Botão */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    {loading ? "Carregando..." : "Criar conta"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Já tem uma conta?{" "}
                <Link to="/entrar" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
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
