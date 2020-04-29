import React, { Component, useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import axios from "axios"
import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import { ItemCard } from "components/ItemCard/ItemCard.jsx";
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
} from "variables/Variables.jsx";

const StoreManage = (props) => {

    const { store } = useParams();

    const [{ data: stores, loading: l1, error: e1 }] = useAxios(API_URL + "stores/");
    const [{ data: items, loading: l2, error: e2 }] = useAxios(API_URL + "stores/" + store + "/items/");
    // const [{ data: items, loading: l2, error: e2 }] = useAxios(API_URL + "stores/" + store + "/items/");
    

    if (l1 || l2) return <p>Loading...</p>
    if (e1 || e2) return <p>Error!</p>

    const createLegend = (json) => {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

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
                                <div className="legend">{createLegend(legendSales)}</div>
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
                                <div className="legend">{createLegend(legendPie)}</div>
                            }
                        />
                    </Col>
                </Row>
                <Col md={6}>
                    <Card
                        title="Items"
                        category={stores ? "Browse, or, and edit items for " + stores.find(obj => { return obj.id === parseInt(props.match.params.store) }).name + " here" : ""}
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table hover>
                                <thead>
                                    <tr>
                                        {["ID", "Name", "PricePoint", "Store", "Actions"].map((prop, key) => {
                                            return <th key={key}>{prop}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items ?
                                            items.map((prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(prop).map((prop, key) => {
                                                            return <td key={key}>{prop}</td>;
                                                        })}
                                                        <td>{prop.id}</td>
                                                    </tr>
                                                );
                                            })
                                            :
                                            null
                                    }
                                </tbody>
                            </Table>
                        }
                    />
                </Col>
                <Col md={6}>
                    <Card
                        title="Price Points"
                        category="Select an item to manage its price points"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table hover>
                                <thead>
                                    <tr>
                                        {["ID", "Name", "PricePoint", "Store", "Actions"].map((prop, key) => {
                                            return <th key={key}>{prop}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items ?
                                            items.map((prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(prop).map((prop, key) => {
                                                            return <td key={key}>{prop}</td>;
                                                        })}
                                                        <td>Buttons</td>
                                                    </tr>
                                                );
                                            })
                                            :
                                            null
                                    }
                                </tbody>
                            </Table>
                        }
                    />
                </Col>
            </Grid>
        </div>
    );
}

export default StoreManage;
