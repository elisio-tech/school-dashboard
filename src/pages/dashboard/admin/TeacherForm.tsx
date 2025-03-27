import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { z } from "zod";
import Button from "../../../components/ui/button/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { useState } from "react";
import { useAuth } from "../../../context/UserContext";
import MultiSelect from "../../../components/form/MultiSelect";
import { multiOptions } from "../../../utils/utils";
import Loader from "../../../components/ui/loader/Loader";
import FileInput from "../../../components/form/input/FileInput";

interface TeacherErrors {
  name?: string;
  email?: string;
  phone?: string;
  bi?: string;
  gender?: string;
  [key: string]: string | undefined;
}

const TeacherSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  bi: z.string().min(5, "BI must have at least 5 characters"),

  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone number must have at least 8 digits"),
});

export default function TeacherForm({ closeModal: externalCloseModal }: any) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [bi, setBi] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null)
  const [handleError, setHandleError] = useState<string | null>(null);
  const [errors, setErrors] = useState<TeacherErrors | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const { addTeacher } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
  
    // Validação dos campos
    const validationResult = TeacherSchema.safeParse({ email, bi, name, phone });
  
    if (!validationResult.success) {
      const formattedErrors: TeacherErrors = {};
      validationResult.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
  
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }
  
    try {
      let photo = "";
  
      // 🚀 Fazendo upload da imagem para o Firebase Storage
      if (image) {
        const storageRef = ref(storage, `teachers/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        photo = await getDownloadURL(snapshot.ref);
      } else {
        setLoading(false);
        return ;;
      }
  
      // 🚀 Adicionando professor com a URL da imagem no Firestore
      await addTeacher({
        id: crypto.randomUUID(),
        userType: "teacher",
        name,
        email,
        phone,
        bi,
        subjects,
        photo, // Salvar a URL da foto no banco
      });
  
      console.log("✅ Professor adicionado com sucesso!");
      externalCloseModal();
    } catch (error: any) {
      setHandleError(error.message || "Erro ao cadastrar professor");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {loading && <Loader />}
      <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
        {handleError && <p className="text-xs text-red-500">{handleError}</p>}
        <div>
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors?.name}
                hint={errors?.name}
                placeholder="Name"
              />
            </div>
            <div>
              <Label>
                BI<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="bi"
                value={bi}
                error={!!errors?.bi}
                hint={errors?.bi}
                onChange={(e) => setBi(e.target.value)}
                placeholder="Number of BI"
              />
            </div>

            <div>
              <Label>
                Photo<span className="text-red-500">*</span>
              </Label>
              <FileInput onChange={handleFileChange} className="custom-class" />
            </div>
          </div>
        </div>
        <div className="mt-7">
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Contact
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>
                Email Address<span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                value={email}
                error={!!errors?.email}
                hint={errors?.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
            </div>
            <div>
              <Label>
                Phone<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="phone"
                value={phone}
                error={!!errors?.phone}
                hint={errors?.phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>
        <div className="mt-7">
          <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
            Professional Information
          </h5>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"></div>
        </div>
        <div className="mt-5 mb-12">
          <Label>
            Subjects
            <span className="text-red-500">*</span>
          </Label>
          <div>
            <MultiSelect
              options={multiOptions}
              defaultSelected={["Math", "Biology"]}
              onChange={(values) => {
                console.log("Valores selecionados:", values);
                setSubjects(values);
              }}
            />

            <p className="sr-only">Selected Values: {subjects.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button onClick={handleSubmit}>
          {loading ? "Carregando..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
