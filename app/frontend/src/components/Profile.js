import React, { Fragment } from "react";

import {
  Row,
  Col,
  Card,
  CardImg,
} from "reactstrap"

import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading Profile...</div>;
  }

  return (
    <Fragment>
      <Col xs="3" />
      <Col className="d-flex justify-content-center">
        <Card>
          <Row>
            <Col m="2"><CardImg src={user.picture} alt="Profile" /></Col>
            <Col m="4">
              <h2>{user.nickname}</h2>
              <p>Username: {user.email}</p>
              <p></p>
              {/* <code>{JSON.stringify(user, null, 2)}</code> */}
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs="3" />





    </Fragment>
  );
};

export default Profile;