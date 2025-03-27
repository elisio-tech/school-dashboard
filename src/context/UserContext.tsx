import React, { createContext, useState, useContext, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  deleteUser,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Teacher, Student, Academic, Admin, CourseType } from "../types/type";

type AuthContextType = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    fname: string,
    lname: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  userData: any | null;
  signInWithGoogle: () => Promise<void>;
  addTeacher: (teacher: Teacher) => Promise<string>;
  addStudent: (student: Student) => void;
  addAcademic: (academic: Academic) => void;
  addAdmin: (admin: Admin) => void;
  addCourse: (course: CourseType) => void;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Buscar dados do usuário no Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Documento não encontrado!");
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await deleteUser(user);
        throw new Error(
          "Este email não está registrado. Por favor, crie uma conta."
        );
      }

      // Usuário existe no Firestore, atualiza os dados se necessário
      await setDoc(
        docRef,
        {
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // salvar user no firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
      });
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  // Add teacher
 const addTeacher = async (teacher: Teacher) => {
  try {
    const docRef = await addDoc(collection(db, "teachers"), {
      ...teacher,
      createdAt: new Date().toISOString(),
    });
    return docRef.id; 
    } catch (error) {
    throw new Error("Falha ao cadastrar professor.");
  }
}


  // Add Student
  const addStudent = async (student: Student) => {
    try {
      await addDoc(collection(db, "students"), student);
    } catch (error) {
      console.log("Erro ao adicionar estudante", error);
    }
  };

  // Add Secretary time
  const addAcademic = async (academic: Academic) => {
    try {
      await addDoc(collection(db, "academic"), academic)
    } catch (error) {
      console.log("Erro ao adicionar academic", error);
    }
  }

  // Add Admin team
  const addAdmin = async (admin: Admin) => {
    try {
      await addDoc(collection(db, "admin"), admin)
    } catch (error) {
      console.log("Erro ao adicionar admin", error);
    }
  } 

  // Add Course
  const addCourse = async (course: CourseType) => {
    try {
      await addDoc(collection(db, "course"), course)
    } catch (error) {
      console.log("Erro ao adicionar course", error);
    }
  }


  return (
    <AuthContext.Provider
      value={{
        addAdmin,
        addCourse,
        addAcademic,
        addStudent,
        addTeacher,
        signInWithGoogle,
        user,
        userData,
        signIn,
        signOutUser,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado com AuthProvider");
  }

  return context;
};
