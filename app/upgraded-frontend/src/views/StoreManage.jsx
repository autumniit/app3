import React, { Component, useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";

import axios from "axios"
import { API_URL } from "../constants";

import { Card } from "components/Card/Card.jsx";
import { ItemCard } from "components/ItemCard/ItemCard.jsx";
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

const StoreManage = (props) => {

    const [stores, setStores] = useState();
    const [store, setStore] = useState();

    const fetchStores = async () => {
        const result = await axios(API_URL + "stores/");
        setStores(result.data);
        console.log(result.data);
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const [items, setItems] = useState();

    const fetchItems = async () => {
        const result = await axios(API_URL + "stores/" + props.match.params.store + "/items/");
        setItems(result.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

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
                                                console.log(prop)
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(prop).map((prop, key) => {
                                                            return <td key={key}>{prop}</td>;
                                                        })}
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
                                                console.log(prop)
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(prop).map((prop, key) => {
                                                            return <td key={key}>{prop}</td>;
                                                        })}
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
