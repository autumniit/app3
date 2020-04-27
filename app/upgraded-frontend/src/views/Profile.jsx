import { useAuth0 } from "../react-auth0-spa";

import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

const Profile = () => {

  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={4}>
            <UserCard
              bgImage={"https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"}
              avatar={user.picture}
              name={user.name}
              userName={user.email}
              description={
                <span>
                  Something
                    <br />
                    Something
                    <br />
                    Something
                  </span>
              }
              socials={
                <div>
                  <Button simple>
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button simple>
                    <i className="fa fa-twitter" />
                  </Button>
                  <Button simple>
                    <i className="fa fa-google-plus-square" />
                  </Button>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Profile;
