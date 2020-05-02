import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Spinner } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";
import PricePointTableCard from "components/PricePointTableCard/PricePointTableCard.jsx";
import ThompsonVisualizationGraphCard from "components/ThompsonVisualizationGraphCard/ThompsonVisualizationGraphCard.jsx"


const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();

    // Axios Hooks -----

    const [{ data: graphParams, loading, error }, getGraphParams]
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


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

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
