import { Button } from "@mui/material";
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
            <div style={{ display: "inline-block" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor: "white",
                  "&:hover": {
                    borderRight: 0,
                  },
                }}
              >
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  Log In
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  color: "black",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to="/registration"
                >
                  Sign In
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };
