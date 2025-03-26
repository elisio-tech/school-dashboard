import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { z } from "zod";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import React, { useState } from "react";
import { GenderType, Teacher } from "../../../types/type";

import { useAuth } from "../../../context/UserContext";
import Select from "../../../components/form/Select";
import MultiSelect from "../../../components/form/MultiSelect";
import { multiOptions } from "../../../utils/utils";

interface TeacherErrors {
  name?: string;
  bi?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  province?: string;
  district?: string;
  teachingLevel?: string;
  fieldOfExpertise?: string;
  academicDegree?: string;
  salary?: string;
  [key: string]: string | undefined;
}

const TeacherSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  bi: z.string().min(5, "BI must have at least 5 characters"),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  gender: z.string().min(1, "Gender is required"),

  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone number must have at least 8 digits"),
  province: z.string().min(2, "Province must have at least 2 characters"),
  district: z.string().min(2, "District must have at least 2 characters"),

  teachingLevel: z
    .string()
    .min(3, "Teaching level must have at least 3 characters"),
  fieldOfExpertise: z
    .string()
    .min(3, "Field of expertise must have at least 3 characters"),
  academicDegree: z
    .string()
    .min(3, "Academic degree must have at least 3 characters"),
  salary: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Salary must be a valid number"),
});

export default function TeacherForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [salary, setSalary] = useState<string | undefined>(undefined);
  
  
  const [subjects, setSubjects] = useState<string[]>([]);
  const [bi, setBi] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState("Male");
  const [teachingLevel, setTeachingLevel] = useState<string>("");
  const [fieldOfExpertise, setFieldOfExpertise] = useState<string>("");
  const [academicDegree, setAcademicDegree] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const [errors, setErrors] = useState<TeacherErrors>({});


  const { closeModal } = useModal();
  const { addTeacher } = useAuth();

  const handleGenderChange = (value: string) => {
    if (value === "Male" || value === "Female") {
      setGender(value);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validations = TeacherSchema.safeParse({
      name,
      email,
      phone,
      photo,
      salary,
      subjects,
      bi,
      birthDate,
      gender,
      teachingLevel,
      fieldOfExpertise,
      academicDegree,
    });

    if (!validations.success) {
      setLoading(false);
      const formattedErrors = validations.error.format();

      const simplifiedErrors: TeacherErrors = Object.fromEntries(
        Object.entries(formattedErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value?._errors?.[0],
        ])
      );

      setErrors(simplifiedErrors);
      setLoading(false);
      return;
    }

    try {
      const newTeacher: Teacher = {
        id: crypto.randomUUID(),
        userType: "teacher",
        name,
        email,
        phone,
        bi,
        birthDate,
        gender: gender as GenderType,
        teachingLevel,
        fieldOfExpertise,
        academicDegree,
        salary: salary || "0",
        subjects,
      };

      await addTeacher(newTeacher);

      setErrors({});
      closeModal();
    } catch (error: any) {
      setHandleError(error.message || "Erro ao cadastrar professor");
    } finally {
      setLoading(false);
    }
  };



  return (
    <form className="flex flex-col">
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
                error={!!errors.name}
                hint={errors.name}
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
                error={!!errors.bi}
                hint={errors.bi}
                onChange={(e) => setBi(e.target.value)}
                placeholder="Number of BI"
              />
            </div>
            <div>
              <Label>
                Birth Date<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="birthDate"
                value={birthDate}
                error={!!errors.birthDate}
                hint={errors.birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="Birthdate"
              />
            </div>
            <div>
              <Label>
                Gender<span className="text-red-500">*</span>
              </Label>
              <Select
                defaultValue={gender}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                placeholder="Select gender"
                onChange={handleGenderChange}
              />
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
                error={!!errors.email}
                hint={errors.email}
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
                error={!!errors.phone}
                hint={errors.phone}
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
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label>
                Teaching Level<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="teachingLevel"
                value={teachingLevel}
                error={!!errors.teachingLevel}
                hint={errors.teachingLevel}
                onChange={(e) => setTeachingLevel(e.target.value)}
                placeholder="Teaching level"
              />
            </div>
            <div>
              <Label>
                Field of Expertise
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="fieldOfExpertise"
                value={fieldOfExpertise}
                onChange={(e) => setFieldOfExpertise(e.target.value)}
                error={!!errors.fieldOfExpertise}
                hint={errors.fieldOfExpertise}
                placeholder="Field of expertise"
              />
            </div>
            <div>
              <Label>
               Fild
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="fieldOfExpertise"
                value={fieldOfExpertise}
                onChange={(e) => setFieldOfExpertise(e.target.value)}
                error={!!errors.fieldOfExpertise}
                hint={errors.fieldOfExpertise}
                placeholder="Field of expertise"
              />
            </div>

            <div>
              <Label>
                Salary<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="salary"
                value={salary}
                error={!!errors.salary}
                hint={errors.salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
              />
            </div>
          </div>
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
              onChange={(values) => setSubjects(values)}
            />
            <p className="sr-only">
              Selected Values: {subjects.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button size="sm" onClick={handleSave}>
          {loading ? "Carregando..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
