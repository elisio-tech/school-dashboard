export type Permission = "create" | "read" | "update" | "delete";

export type UserType = "admin" | "student" | "teacher" | "academic";

export const permissions: Record<UserType, Permission[]> = {
  admin: ["create", "read", "update", "delete"],
  academic: ["read", "update", "create"],
  teacher: ["read", "update"],
  student: ["read"],
};

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  salary?: string;
  userType: UserType;
}

type SubjectType = {
  name: string;
  grade: string;
};

export type CourseType = {
  name: string;
  subjects: SubjectType[];
};

export interface Admin extends User {
  adminId: string;
}

type AcademicType = "reception" | "secretary" | "finance";

export interface Academic extends User {
  academicId: string;
  areas: AcademicType[];
}

export interface Student extends User {
  studentId: string;
  course: CourseType;
}

type GenderType = "Male" | "Female";

export interface Teacher extends User {
  teacherId: string;
  subjects: string[];
  bi: string;
  birthDate: string;
  gender: GenderType;
  province: string;
  district: string;
  teachingLevel: string;
  fieldOfExpertise: string;
  academicDegree: string;
}
