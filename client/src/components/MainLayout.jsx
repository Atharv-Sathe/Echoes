import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterComponent from "./Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen"> 
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}
