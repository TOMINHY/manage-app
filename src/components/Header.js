import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo192.png";
import { useNavigate, NavLink } from "react-router-dom";
import "./TableUser.scss";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userActions";
import { useEffect } from "react";
const Header = (props) => {
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };
  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      navigate("/");
      toast.success("Log out success!", {
        delay: false,
        pauseOnHover: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" bg="light">
        <Container>
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              alt="logo"
              width={30}
              height={30}
              className="d-inline-block align-top"
            />{" "}
            Manage Users App
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="nav">
            {window.location.pathname === "/" || (user && user.email) ? (
              <>
                <Nav className="me-auto">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link">
                      <strong style={{ color: "#000" }}>Welcome!</strong>
                      &nbsp;
                      <span>{user.email}</span>
                    </span>
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.email ? (
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
