import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HomeOrCapture() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Navigate to="/new" /> : <Navigate to="/home" />;
}
