import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { z, ZodFormattedError } from "zod";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import { useModal } from "../../../hooks/useModal";
import React, { useState } from "react";
import { Teacher } from "../../../types/type";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

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

export default function Teachers() {
  const [loading, setLoading] = useState(false)
  const [handleError, setHandleError] = useState<string | null>(null);
  const [errors, setErrors] = useState<TeacherErrors>({});
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: "",
    bi: "",
    birthDate: "",
    gender: "Male",
    email: "",
    phone: "",
    province: "",
    district: "",
    teachingLevel: "",
    fieldOfExpertise: "",
    academicDegree: "",
    salary: "",
  });

  const { openModal, isOpen, closeModal } = useModal();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const validations = TeacherSchema.safeParse(formData);
  
    if (!validations.success) {
      setLoading(false)
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
      await addDoc(collection(db, "teachers"), formData);
      setErrors({});
      closeModal();
    } catch (error: any) {
      setHandleError(error.message || "Erro ao cadastrar professor");
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <>
      <PageBreadcrumb pageTitle="Teachers" />
      <div className="space-y-6">
        <ComponentCard title="Teachers" click={openModal} btn={"New teacher"}>
          <BasicTableOne />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <form className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                  {handleError && (
                    <p className="text-xs text-red-500">{handleError}</p>
                  )}
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
                          value={formData.name}
                          onChange={handleChange}
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
                          value={formData.bi}
                          error={!!errors.bi}
                          hint={errors.bi}
                          onChange={handleChange}
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
                          value={formData.birthDate}
                          error={!!errors.birthDate}
                          hint={errors.birthDate}
                          onChange={handleChange}
                          placeholder="Birthdate"
                        />
                      </div>
                      <div>
                        <Label>
                          Gender<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="gender"
                          error={!!errors.gender}
                          hint={errors.gender}
                          value={formData.gender}
                          onChange={handleChange}
                          placeholder="Gender"
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
                          value={formData.email}
                          error={!!errors.email}
                          hint={errors.email}
                          onChange={handleChange}
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
                          value={formData.phone}
                          error={!!errors.phone}
                          hint={errors.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <Label>
                          Province<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="province"
                          value={formData.province}
                          error={!!errors.province}
                          hint={errors.province}
                          onChange={handleChange}
                          placeholder="Province"
                        />
                      </div>
                      <div>
                        <Label>
                          District<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="district"
                          value={formData.district}
                          error={!!errors.district}
                          hint={errors.district}
                          onChange={handleChange}
                          placeholder="District"
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
                          value={formData.teachingLevel}
                          error={!!errors.teachingLevel}
                          hint={errors.teachingLevel}
                          onChange={handleChange}
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
                          value={formData.fieldOfExpertise}
                          onChange={handleChange}
                          error={!!errors.fieldOfExpertise}
                          hint={errors.fieldOfExpertise}
                          placeholder="Field of expertise"
                        />
                      </div>
                      <div>
                        <Label>
                          Academic Degree<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="academicDegree"
                          value={formData.academicDegree}
                          error={!!errors.academicDegree}
                          hint={errors.academicDegree}
                          onChange={handleChange}
                          placeholder="Academic degree"
                        />
                      </div>
                      <div>
                        <Label>
                          Salary<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="salary"
                          value={formData.salary}
                          error={!!errors.salary}
                          hint={errors.salary}
                          onChange={handleChange}
                          placeholder="Salary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    { loading ? "Carregando..." : "Save changes" }
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </ComponentCard>
      </div>
    </>
  );
}
