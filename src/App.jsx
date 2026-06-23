import { Routes, Route } from "react-router-dom";
import Materials from "./pages/Materials";
import Providers from "./pages/Providers";
import LoginNew from "./pages/LoginNew";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reviews from "./pages/Reviews";
import Budget from "./pages/Budget";
import Images from "./pages/Images";
import Admin from "./pages/Admin";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginNew />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/images" element={<Images />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/reports" element={<Reports />} />
      
    </Routes>
  );
}

export default App;