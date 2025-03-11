import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastrar" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<>Not found !</>} />
        </Routes>
      </Router>
    </div>
  );
}
