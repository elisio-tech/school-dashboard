import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Home from "./pages/dashboard/admin/Home";
import AppLayout from "./layout/AppLayout";
import Teachers from "./pages/dashboard/admin/teacher/ Teachers";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/UserContext";
import Secretary from "./pages/dashboard/admin/secretary /Secretary";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Auth Layout */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/secretary" element={<Secretary />} />
            </Route>

            <Route path="/entrar" element={<SignIn />} />
            <Route path="/cadastrar" element={<SignUp />} />

            {/* Fallback Route */}
            <Route path="*" element={<>Not found !</>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
