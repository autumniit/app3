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
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";

import Home from "views/Home.jsx"
import StoreList from "views/StoreList.jsx";
import StoreManage from "views/StoreManage.jsx";
import Profile from "views/Profile.jsx";
import UnityConnect from "views/UnityConnect.jsx";
import Simulation from "views/Simulation.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/example",
    example: true,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/example",
    example: true,
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/example",
    example: true,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/example",
    example: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/example",
    example: true,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/example",
    example: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/example",
    example: true,
  },
  // =============================== Below is what's used in the app ===============================
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
  // {
  //   path: "/store/:storeId",
  //   name: "Store Manage",
  //   icon: "pe-7s-box2",
  //   component: StoreManage,
  //   layout: "",
  //   redirect: true
  // },
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