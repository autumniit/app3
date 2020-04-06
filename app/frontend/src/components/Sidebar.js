import React, { Fragment, useState } from "react";
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
} from "reactstrap"


import { useAuth0 } from "../react-auth0-spa";

const Sidebar = () => {
    const { loading, user } = useAuth0();

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    if (loading || !user) {
        return <div>Loading Sidebar...</div>;
    }

    return (
        <Fragment>
            <p>List Based</p>
            <Nav vertical>
                <NavItem>
                    <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Another Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="#">Disabled Link</NavLink>
                </NavItem>
            </Nav>
            <hr />
        </Fragment>
    );
};

export default Sidebar;