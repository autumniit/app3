import React, { Fragment } from "react";
import {
  Media,
  Row,
  Col
} from "reactstrap"
import dashmock from "../dashmock.png"


import { useAuth0 } from "../react-auth0-spa";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <Media style={{ maxHeight: 1800, maxWidth: 500 }} src={dashmock} alt="dashmock" />
        </Col>
      </Row>


    </Fragment>
  );
};

export default Dashboard;