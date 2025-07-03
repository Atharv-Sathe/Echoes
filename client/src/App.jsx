import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import HomeOrCapture from "./pages/HomeOrCapture";
import { CapturePage } from "./pages/CapturePage";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import FocusLayout from "./components/FocusLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeOrCapture />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Routes that require singning in */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Route>

        {/* Zen Mode */}
        <Route element={<FocusLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/new" element={<CapturePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
