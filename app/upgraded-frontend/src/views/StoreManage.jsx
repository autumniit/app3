import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";
import PricePointTableCard from "components/PricePointTableCard/PricePointTableCard.jsx";

import {
    dataPie,
    legendPie,
    responsiveSales,
    legendSales,
} from "variables/Variables.jsx";

const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();

    // const [{ data: stores, loading: l1, error: e1 }] = useAxios(API_URL + "stores/");

    // Axios Hooks -----

    const [{ data: pricePoints, loading: l3, error: e3 }, getPricePoints]
        = useAxios({
            url: API_URL + "stores/" + 40 + "/items/" + pricePointId + "/price_points",
            method: "GET"
        },
            { manual: true }
        );

    useEffect(() => {
        if (pricePointId) {
            getPricePoints();
        }
    }, [pricePointId])

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

    // if (l1) return <p>Loading...</p>
    // if (e1) return <p>Error!</p>

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
                                        data=
                                        {
                                            pricePoints ?
                                                {
                                                    labels: pricePoints.map(obj => obj.price_point),
                                                    series: [pricePoints.map(obj => (obj.alpha / obj.beta))]
                                                }
                                                :
                                                {
                                                    labels: [],
                                                    series: []
                                                }
                                        }
                                        type="Line"
                                        options={
                                            {
                                                low: 0,
                                                high: 20,
                                                showArea: false,
                                                height: "245px",
                                                axisX: {
                                                    type: ChartistGraph.AutoScaleAxis,
                                                    showGrid: true,
                                                },
                                                lineSmooth: false,
                                                showLine: true,
                                                showPoint: true,
                                                fullWidth: true,
                                                chartPadding: {
                                                    right: 50
                                                }
                                            }
                                        }
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
                        stores={props.stores}
                        storeId={storeId}
                        setPricePointId={setPricePointId}
                    />
                </Col>
                <Col md={7}>
                    <PricePointTableCard
                        storeId={storeId}
                        pricePointId={pricePointId}
                        getPricePoints={getPricePoints}
                    />
                </Col>
            </Grid>
        </div>
    );
}

export default StoreManage;
