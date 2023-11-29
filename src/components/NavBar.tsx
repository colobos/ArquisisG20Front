import React, { useEffect, useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { getAccessTokenSilently } = useAuth0();

  // const isAdmin = false; // Obtener Admin. En este caso no es usuario Admin
  const [isAdmin, setIsAdmin] = useState(false)
  const checkAdmin = async () => {
    const token = await getAccessTokenSilently();
    console.log('Token del usuario:', token);
    const decodedAccessToken = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded Access Token:', decodedAccessToken);
    if (decodedAccessToken['permissions'][0] === 'admin:uses') {
      setIsAdmin(true);
      console.log('Es admin!!')
    }
    else {
        setIsAdmin(false);
        console.log('No es admin!!');
    }
  };

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const checkUserAdmin = async () => {
      if (isAuthenticated) {
        try {
          await checkAdmin(); 
        } catch (error) {
          console.error("Error al verificar el estado de administrador:", error);
        }
      }
    };
    checkUserAdmin(); 

  }); 


  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md" container={false}>
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  className="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>

              {isAuthenticated && !isAdmin && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/acciones_disponibles"
                    className="router-link-exact-active"
                  >
                    Acciones Disponibles
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/subasta"
                    className="router-link-exact-active"
                  >
                    Subasta
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated && isAdmin && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/comprar_admin"
                    className="router-link-exact-active"
                  >
                    Comprar Acciones (Admin)
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated && !isAdmin && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/comprar_admin_user_normal"
                    className="router-link-exact-active"
                  >
                    Comprar Acciones (No Admin)
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/perfil"
                    className="router-link-exact-active"
                  >
                    Acciones Compradas
                  </NavLink>
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/predicciones_realizadas"
                    className="router-link-exact-active"
                  >
                    Simulador de Predicciones 
                  </NavLink>
                </NavItem>
              )}

              
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => {loginWithRedirect()}}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user?.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user?.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeclassname="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user?.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user?.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    className="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
