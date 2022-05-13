import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sider } from "../Sider";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
			<div className="flex-col">
				<Sider />
  	    <Outlet />
			</div>
      <Footer />
    </div>
  );
};

export { MainLayout };
