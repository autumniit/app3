// import React from 'react';
import homeimg from '../homeimg.svg';

import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

const Home = (props) => {

  return (
    <Container style={{ marginTop: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row>

        <Col>
          <img src={homeimg} alt="logo" />
        </Col>

        <Col>
          <p style={{ textAlign: "left" }}>
            [Under Construction]
            </p>
        </Col>
      </Row>

    </Container>
  );
}

export default Home;