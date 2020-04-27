import { useAuth0 } from "../../react-auth0-spa";
import React from "react";
import { NavLink } from "react-router-dom";

const AuthenNavLink = (props) => {

    const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        
        <li
            className="active active-pro"
            key="authen-nav-link"
        >
            <NavLink
                onClick={!isAuthenticated ? () => loginWithRedirect({}) : () => logout()}
                className="nav-link"
                activeClassName="active"
            >
                <i className="pe-7s-door-lock" />
                <p>{!isAuthenticated ? "Log In" : "Log Out"}</p>
            </NavLink>
        </li>
    )
}

export default AuthenNavLink;
