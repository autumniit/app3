import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { ItemCard } from "components/ItemCard/ItemCard.jsx";
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
    legendBar,
    thArray,
    tdArray
} from "variables/Variables.jsx";

class StoreList extends Component {
    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="Users Behavior"
                                category="24 Hours performance"
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={dataSales}
                                            type="Line"
                                            options={optionsSales}
                                            responsiveOptions={responsiveSales}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendSales)}</div>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Email Statistics"
                                category="Last Campaign Performance"
                                stats="Campaign sent 2 days ago"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth"
                                    >
                                        <ChartistGraph data={dataPie} type="Pie" />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>
                    </Row>
                    <Col md={12}>
                        <Card
                            title="Striped Table with Hover"
                            category="Here is a subtitle for this table"
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table hover>
                                    <thead>
                                        <tr>
                                            {thArray.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tdArray.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Row>
                        <Col lg={6} sm={12}>
                            <ItemCard
                                bigIcon={<i className="pe-7s-cart text-success" />}
                                statsText="StoreID: "
                                statsValue="Name"
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated now"
                                settingIcon={<i className="pe-7s-config" />}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} sm={12}>
                            <ItemCard
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
