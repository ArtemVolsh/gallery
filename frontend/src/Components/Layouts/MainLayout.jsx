import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ExhSider } from "../ExhSider";
import { ExcSider } from "../ExcSider";
import { NewsSider } from "../NewsSider";

const MainLayout = () => {
  const location = useLocation();
  const EXHIBITONS = "/exhibitions";
  const EXCURSIONS = "/excursions";
  const NEWS = "/news";

  function renderSider(key) {
    switch (key) {
      case EXHIBITONS:
        return <ExhSider />;

      case EXCURSIONS:
        return <ExcSider />;

      case NEWS:
        return <NewsSider />;

      default:
        break;
    }
  }

  return (
    <div className="app-wrapper">
      <Header />
      <div className="flex-col">
        {renderSider(location.pathname)}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { MainLayout };
