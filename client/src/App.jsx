import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footercom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import HomeOrCapture from "./pages/HomeOrCapture";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeOrCapture />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Routes that require singning in */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footercom />
    </BrowserRouter>
  );
}
