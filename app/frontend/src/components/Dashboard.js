import React, { Fragment } from "react";
import {Media} from "reactstrap"
import dashmock from "../dashmock.png"


import { useAuth0 } from "../react-auth0-spa";

const Dashboard = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <Fragment>
      <Media style = { {maxHeight: 1800, maxWidth: 1650 }} src={dashmock} alt="dashmock" />
    </Fragment>
  );
};

export default Dashboard;