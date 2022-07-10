import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOutCtx, userCtx } from "../context/UserProvider";

export function NavBar() {
  const user = useContext(userCtx);
  const logout = useContext(logOutCtx);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          EmaShop
        </Link>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </Nav>
        <Nav>
          {user ? (
            <>
              <div className="nav-link" >Hi {user.name}</div>
              <Link to="/my-items" className="nav-link">
                My Items
              </Link>
              <Link to="/create-item" className="nav-link">
                Create Item
              </Link>
              <div onClick={logout} role="button" className="nav-link">
                Log out
              </div>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
