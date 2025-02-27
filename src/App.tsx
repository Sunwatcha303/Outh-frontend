import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Callback from "./components/callback/Callback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
