import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StoreCard } from "components/StoreCard/StoreCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from "variables/Variables.jsx";

class StoreList extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StoreCard
                                bigIcon={<i className="pe-7s-cart text-success" />}
                                statsText="StoreID: "
                                statsValue="Name"
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated now"
                                settingIcon={<i className="pe-7s-config" />}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default StoreList;
