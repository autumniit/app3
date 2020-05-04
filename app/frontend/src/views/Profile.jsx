import { useAuth0 } from "../react-auth0-spa";

import React, { } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

const Profile = () => {

  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={4} />
          <Col md={4}>
            <UserCard
              bgImage={"https://images.unsplash.com/photo-1588598046214-acc6a5e46174?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3578&q=80"}
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
          <Col md={4} />
        </Row>
      </Grid>
    </div>
  );
}

export default Profile;
