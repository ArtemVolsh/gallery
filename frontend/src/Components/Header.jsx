import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header-wrapper">
        <div className="logo">
          <h3>Gallery</h3>
        </div>
        <div className="navigation">
          <nav>
            <Link to="/">Homepage</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/excursions">Excursions</Link>
            <Link to="/news">News</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };
