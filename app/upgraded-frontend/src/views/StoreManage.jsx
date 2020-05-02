import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";
import PricePointTableCard from "components/PricePointTableCard/PricePointTableCard.jsx";
import ThompsonVisualizationGraphCard from "components/ThompsonVisualizationGraphCard/ThompsonVisualizationGraphCard.jsx"

import {
    dataPie,
    legendPie,
} from "variables/Variables.jsx";


const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();

    // const [{ data: stores, loading: l1, error: e1 }] = useAxios(API_URL + "stores/");

    // Axios Hooks -----

    const [{ data: pricePoints, loading: l3, error: e3 }, getPricePoints]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/price_points",
            method: "GET"
        },
            { manual: true }
        );

    const [{ data: graphParams, loading: l4, error: e4 }, getGraphParams]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/thompson_graph",
            method: "GET"
        },
            { manual: true }
        );

    useEffect(() => {
        if (pricePointId) {
            getGraphParams();
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
                    <Col md={4}>
                        <ItemTableCard
                            stores={props.stores}
                            storeId={storeId}
                            setPricePointId={setPricePointId}
                        />
                    </Col>
                    <Col md={4}>
                        {/* <Card
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
                        /> */}
                    </Col>
                </Row>

                <Col md={6}>
                    <PricePointTableCard
                        storeId={storeId}
                        pricePointId={pricePointId}
                        getPricePoints={getPricePoints}
                        getGraphParams={getGraphParams}
                    />
                </Col>
                <Col md={6}>
                    <ThompsonVisualizationGraphCard
                        graphParams={graphParams}
                        refreshButton={<i className="pe-7s-refresh-2" onClick={() => getGraphParams()} />}
                    />
                </Col>

            </Grid>
        </div>
    );
}

export default StoreManage;
