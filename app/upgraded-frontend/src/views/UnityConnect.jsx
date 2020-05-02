import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

const UnityConnect = () => {

  return (
    <>
      <div className="typo-line">
        <h2>
          Connect to Unity <br />
          <small>Follow these simple steps to have your own dynamic pricing system integrated into your game.</small>
        </h2>
      </div>
      <div className="typo-line">
        <p>
          1) ewrw <br />
          2) 213123 <br />
          3) l;,psf <br />
        </p>
      </div>
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={1} sm={1} />
            <Col lg={10} sm={10}>
              <Card
                content=
                {
                  <div className="typo-line">
                    <p className="code">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing
                      elit, sed diam nonummy nibh euismod tincidunt ut
                      laoreet dolore magna aliquam erat volutpat. Ut wisi
                      enim ad minim veniam.
                  </p>
                  </div>
                }
              />


              {/* <Card
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              /> */}
            </Col>
            <Col lg={1} sm={1} />
          </Row>
        </Grid>
      </div>
    </>
  );
}


export default UnityConnect;
