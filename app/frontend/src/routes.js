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

import Home from "views/Home.jsx"
import StoreList from "views/StoreList.jsx";
import Profile from "views/Profile.jsx";
import UnityConnect from "views/UnityConnect.jsx";
import Simulation from "views/Simulation.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-home",
    component: Home,
    layout: "",
  },
  {
    path: "/stores",
    name: "Manage",
    icon: "pe-7s-box2",
    component: StoreList,
    layout: "",
    requireAuth: true,
  },
  {
    path: "/unityconnect",
    name: "Connect to Unity",
    icon: "pe-7s-link",
    component: UnityConnect,
    layout: "",
    requireAuth: true,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "pe-7s-user",
    component: Profile,
    layout: "",
    requireAuth: true,
  },
  {
    path: "/dev/simulate",
    name: "Real-World Store Simulation",
    component: Simulation,
    layout: "",
    redirect: true
  },
];

export default dashboardRoutes;