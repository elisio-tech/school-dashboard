import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Home from "./pages/dashboard/Home";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          {/* Auth Layout */}
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/cadastrar" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<>Not found !</>} />
        </Routes>
      </Router>
    </div>
  );
}
