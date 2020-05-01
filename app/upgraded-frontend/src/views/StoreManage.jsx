import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";

import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
} from "variables/Variables.jsx";

const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();

    const [{ data: stores, loading: l1, error: e1 }] = useAxios(API_URL + "stores/");

    // -> PricePointTableCard
    const [{ data: pricePoints, loading: l3, error: e3 }, getPricePoints]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/price_points",
            method: "GET"
        },
            { manual: true }
        );

    useEffect(() => {
        if (pricePointId) {
            getPricePoints();
        }
    }, [pricePointId])

    // -------------------------

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

    if (l1 || l3) return <p>Loading...</p>
    if (e1 || e3) return <p>Error!</p>

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col md={8}>
                        <Card
                            statsIcon="fa fa-history"
                            id="chartHours"
                            title="Sales"
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
                            title="Proportion of Items Sold"
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
                <Col md={5}>
                    <ItemTableCard
                        stores={stores}
                        storeId= {storeId}
                        setPricePointId = {setPricePointId}
                    />
                </Col>
                <Col md={7}>
                    <Card
                        title={pricePoints ? pricePointId + "'s Price Points" : "Price Points"}
                        category={pricePoints ? "Browse, add, or edit price points of " + pricePointId + " here" : "Select an item to manage its price points"}
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table hover>
                                <thead>
                                    <tr>
                                        {["ID", "PricePoint", "Alpha", "Beta", "Item", "Actions"].map((prop, key) => {
                                            return <th key={key}>{prop}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pricePoints ?
                                            pricePoints.map((prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        {Object.values(prop).map((prop, key) => {
                                                            return <td key={key}>{prop}</td>;
                                                        })}
                                                        <td>
                                                            <i className="pe-7s-config" />
                                                        </td>
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
