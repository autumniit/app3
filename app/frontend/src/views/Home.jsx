import React, { } from "react";
import { Grid, Row, Col, Media } from "react-bootstrap";
import homeimg from "assets/img/homeimg.png"

const Home = () => {
    return (
        <>
            <div className="typo-line">
                <h2>
                    Welcome to DP App! <br />
                    <small>Solution to your dynamic pricing needs</small>
                </h2>
            </div>

            <Grid fluid>
                <Col lg={1} />
                <Col lg={3}>
                    <img src={homeimg} height="360" width="360" />
                </Col>
                <Col lg={6}>
                    <div className="typo-line">
                        <h4>
                            Fast and Simple Setup <br />
                            <small>Have your dynamic pricing system ready in as little as 5 minutes.</small>
                        </h4>
                    </div>
                    <div className="typo-line">
                        <h4>
                            Minimal Programming Required <br />
                            <small>No more hassle. No more time wasted on documentations.</small>
                        </h4>
                    </div>
                    <div className="typo-line">
                        <h4>
                            Universally Compatible<br />
                            <small>No installation needed. Connect to your Unity games with one single script.</small>
                        </h4>
                    </div>
                </Col>
                <Col lg={2} />
            </Grid>
        </>
    );
}

export default Home;
