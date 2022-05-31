import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Reducers/userReducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.user.currentUser.email);
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.currentUser.role == 1);

  return (
    <header className="header-wrapper">
      <div className="logo">
        <h3>Gallery</h3>
      </div>
      <div className="navigation inline-flex">
        <nav className="inline-flex">
          <Link to="/">Homepage</Link>
          <Link to="/exhibitions">Exhibitions</Link>
          <Link to="/excursions">Excursions</Link>
          <Link to="/news">News</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>

          {isAuth ? (
            <div className="inline-flex">
              <AccountCircleIcon />
              <Typography
                sx={{
                  display: "inline-block",
                  padding: "0 10px 0 5px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="body1"
              >
                {userEmail}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  color: "black",
                }}
                onClick={() => dispatch(logout())}
              >
                <Link style={{ color: "black", textDecoration: "none" }} to="/">
                  Log Out
                </Link>
              </Button>
            </div>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
};

export { Header };
