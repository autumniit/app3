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
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  NavbarText,
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

            {isAuthenticated && (
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
            )}

            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}


          </Nav>


          <Col xs="5" className="float-right">
            <NavbarText >
              {isAuthenticated && <>User: {user.name}</>}
            </NavbarText>

            {!isAuthenticated && (<Button className="float-right" onClick={() => loginWithRedirect({})}>Log in</Button>)}
            {isAuthenticated && <Button className="float-right" onClick={() => logout()}>Log out</Button>}

          </Col>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default DPNavbar;