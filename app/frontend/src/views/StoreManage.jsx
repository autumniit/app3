import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";
import PricePointTableCard from "components/PricePointTableCard/PricePointTableCard.jsx";
import ThompsonVisualizationGraphCard from "components/ThompsonVisualizationGraphCard/ThompsonVisualizationGraphCard.jsx"


const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();
    const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date().toLocaleString());

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
            getGraphParamsWrapper();
        }
    }, [pricePointId])

    const getGraphParamsWrapper = () => {
        setLastRefreshedTime(new Date().toLocaleString());
        getGraphParams();
    }


    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error!</p>

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <ThompsonVisualizationGraphCard
                            loading={loading}
                            error={error}
                            graphParams={graphParams}
                            getGraphParamsWrapper={getGraphParamsWrapper}
                            lastRefreshedTime={lastRefreshedTime}
                        />
                    </Col>
                    <Col md={6}>
                        <ThompsonVisualizationGraphCard
                            loading={loading}
                            error={error}
                            graphParams={graphParams}
                            getGraphParamsWrapper={getGraphParamsWrapper}
                            lastRefreshedTime={lastRefreshedTime}
                        />
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
                <Row>
                    <Col md={6}>
                        <ItemTableCard
                            stores={props.stores}
                            storeId={storeId}
                            setPricePointId={setPricePointId}
                        />

                    </Col>
                    <Col md={6}>
                        <PricePointTableCard
                            storeId={storeId}
                            pricePointId={pricePointId}
                            getGraphParams={getGraphParamsWrapper}
                        />

                    </Col>
                </Row>


            </Grid>
        </div>
    );
}

export default StoreManage;
