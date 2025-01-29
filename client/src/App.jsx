import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signup";
// import { KanbanBoard } from "./pages/jobs/KanbanBoard";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { authService } from "./services/auth/authService";
import KanbanBoard from "./pages/jobs/KanbanBoard";
function App() {
  const handleLogout = async () => {
    try {
      await authService.logoutUser();
      window.location.href = "/login"; // Simple redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="p-4 flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">sign up</Link>
          <Link to="/kanban">Kan ban</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
