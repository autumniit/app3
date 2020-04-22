import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/DPNavbar";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Profile from "./components/Profile"
import StoreList from "./components/store/StoreList"
import ItemList from "./components/item/ItemList"
import Home from "./components/Home"
import Blank from "./components/Blank"

import { Spinner } from "reactstrap"


function App() {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner style={{ width: '9rem', height: '9rem' }} />
      </div>

    );
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Navbar />
        </header>
        <Switch>
          {!isAuthenticated && <Route path="/" exact component={Home} />}
          {isAuthenticated && <Route path="/" exact component={StoreList} />}
          <Route path="/profile" component={Profile} />
          {isAuthenticated && <Route path="/store/:storeId" component={ItemList} />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;