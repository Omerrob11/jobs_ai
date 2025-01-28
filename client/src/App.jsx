import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signup";
// import { KanbanBoard } from "./pages/jobs/KanbanBoard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import KanbanBoard from "./pages/jobs/KanbanBoard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="p-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">sign up</Link>
          <Link to="/kanban">Kan ban</Link>
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
