import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export { MainLayout };
