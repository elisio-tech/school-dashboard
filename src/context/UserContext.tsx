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
import { doc, getDoc, setDoc } from "firebase/firestore";

type RoleType = "admin" | "recepcionista" | "doutor";

type AuthContextType = {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    fname: string,
    lname: string,
    role:  RoleType 
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  userData: any | null;
  signInWithGoogle: () => Promise<void>;
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
    lname: string,
    role: string,
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
        role: role
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
  return (
    <AuthContext.Provider
      value={{ signInWithGoogle, user, userData, signIn, signOutUser, signUp }}
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
