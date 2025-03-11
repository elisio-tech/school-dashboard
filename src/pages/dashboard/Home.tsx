import { useAuth } from "../../context/UserContext";

export default function Home() {
  const { userData, signOutUser } = useAuth();

  return (
    <div>
      <button onClick={signOutUser}>Sair</button>
      {userData ? <p>{userData.role} </p> : <span>"Carregando..."</span>}
    </div>
  );
}
