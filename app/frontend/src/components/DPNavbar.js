import React, { useState } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

import {
  Button,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const DPNavbar = (props) => {

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Dynamic Pricing App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/autumniit/app3">GitHub</NavLink>
            </NavItem>


          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {isAuthenticated && <NavLink href="/dashboard">Dashboard</NavLink>}
            </NavItem>
            <NavItem>
              {isAuthenticated && <NavLink href="/profile">User: {user.name}</NavLink>}
            </NavItem>
            <NavItem>
              {!isAuthenticated && (<Button className="float-right" onClick={() => loginWithRedirect({})}>Log in</Button>)}
              {isAuthenticated && <Button className="float-right" onClick={() => logout()}>Log out</Button>}
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default DPNavbar;