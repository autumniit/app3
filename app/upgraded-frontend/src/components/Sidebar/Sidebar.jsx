/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useAuth0 } from "../../react-auth0-spa";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import AuthenNavLink from "../AuthenNavLink/AuthenNavLink.jsx"

import logo from "assets/img/applogo.svg";

const Sidebar = (props) => {

  const { isAuthenticated } = useAuth0();

  const [width, setWidth] = useState(window.innerWidth);

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions.bind());
  }, [])

  const sidebarBackground = {
    backgroundImage: "url(" + props.image + ")"
  };
  return (
    <div
      id="sidebar"
      className="sidebar"
      data-color={props.color}
      data-image={props.image}
    >
      {props.hasImage ? (
        <div className="sidebar-background" style={sidebarBackground} />
      ) : (
          null
        )}
      <div className="logo">
        <element className="simple-text">
          <div className="logo-img">
            <img src={logo} alt="logo_image" />
          </div>
          DP Application
        </element>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {width <= 991 ? <AdminNavbarLinks /> : null}
          {props.routes.map((prop, key) => {
            if (!prop.redirect && !prop.authentication && !prop.example) {
              if (prop.requireAuth && !isAuthenticated) {
                return null;
              }
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
          <AuthenNavLink />

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
