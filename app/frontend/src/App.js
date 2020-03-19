// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { Component, Fragment } from "react";
// import Header from "./components/Header";
// import Home from "./components/Home";

// class App extends Component {
//   render() {
//     return (
//       <Fragment>
//         <Header />
//         <Home />
//       </Fragment>
//     );
//   }
// }

// export default App;

// src/App.js

import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/DPNavBar";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
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
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;