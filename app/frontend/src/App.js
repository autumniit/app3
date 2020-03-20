import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/DPNavbar";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Profile from "./components/Profile"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"


function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;