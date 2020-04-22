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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus magna nunc, lacinia sit amet nisi in, faucibus pharetra diam.
            Integer sollicitudin interdum laoreet. Vestibulum pretium ipsum odio,
            vitae congue magna pellentesque eu. Vestibulum a malesuada felis, eget consequat neque.
            Sed id nibh vel ante ultrices porta. Sed lectus leo, hendrerit quis nisi dictum, finibus dignissim magna.
            </p>
        </Col>
      </Row>

    </Container>
  );
}

export default Home;