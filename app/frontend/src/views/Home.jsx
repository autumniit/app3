import React, { } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";


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
                <Row>
                    <Col lg={1} />
                    <Col lg={7} sm={10}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-timer text-warning" />}
                            // statsText="Fast and Simple Set-Up"
                            statsValue="Fast and Simple Set-Up"
                        // statsIcon={<i className="fa fa-refresh" />}
                        // statsIconText="Updated now"
                        />
                    </Col>
                    <Col lg={4} />
                </Row>
                <Row>
                    <Col lg={1} />
                    <Col lg={7} sm={10}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-smile text-success" />}
                            // statsText="Revenue"
                            statsValue="Minimal Programming Required"
                        // statsIcon={<i className="fa fa-calendar-o" />}
                        // statsIconText="Last day"
                        />
                    </Col>
                    <Col lg={4} />
                </Row>
                <Row>
                    <Col lg={1} />
                    <Col lg={7} sm={10}>
                        <StatsCard
                            bigIcon={<i className="pe-7s-science text-danger" />}
                            // statsText="Errors"
                            statsValue="All in one solution to your pricing needs"
                        // statsIcon={<i className="fa fa-clock-o" />}
                        // statsIconText="In the last hour"
                        />
                    </Col>
                    <Col lg={4} />
                </Row>
            </Grid>
        </>
    );
}

export default Home;
