import { useSelector } from "react-redux";
import { CapturePage } from "./CapturePage";
import Home from "./Home";

export default function HomeOrCapture() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <CapturePage /> : <Home />;
}
