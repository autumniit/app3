import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import ItemTableCard from "components/ItemTableCard/ItemTableCard.jsx";
import PricePointTableCard from "components/PricePointTableCard/PricePointTableCard.jsx";
import ThompsonVisualizationGraphCard from "components/ThompsonVisualizationGraphCard/ThompsonVisualizationGraphCard.jsx"
import PricePropPieCard from "components/PricePropPieCard/PricePropPieCard.jsx"


const StoreManage = (props) => {

    const { storeId } = useParams();
    const [pricePointId, setPricePointId] = useState();
    const [lastGraphRefreshedTime, setLastGraphRefreshedTime] = useState(new Date().toLocaleString());
    const [lastPieRefreshedTime, setLastPieRefreshedTime] = useState(new Date().toLocaleString());


    // Axios Hooks -----

    const [{ data: graphParams, loading: l1, error: e1 }, getGraphParams]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/thompson_graph",
            method: "GET"
        },
            { manual: true }
        );

    const [{ data: pieParams, loading: l2, error: e2 }, getPieParams]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/priceprop_pie",
            method: "GET"
        },
            { manual: true }
        );


    useEffect(() => {
        if (pricePointId) {
            getGraphParamsWrapper();
            getPieParamsWrapper();
        }
    }, [pricePointId])

    const getGraphParamsWrapper = () => {
        setLastGraphRefreshedTime(new Date().toLocaleString());
        getGraphParams();
    }


    const getPieParamsWrapper = () => {
        setLastPieRefreshedTime(new Date().toLocaleString());
        getPieParams();
    }


    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error!</p>

    return (
        <div className="content">
            <Grid fluid>
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
                            getPieParams={getPieParamsWrapper}
                        />

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <PricePropPieCard
                            loading={l2}
                            error={e2}
                            graphParams={pieParams}
                            getGraphParamsWrapper={getPieParamsWrapper}
                            lastRefreshedTime={lastPieRefreshedTime}
                        />
                    </Col>
                    <Col md={6}>
                        <ThompsonVisualizationGraphCard
                            loading={l1}
                            error={e1}
                            graphParams={graphParams}
                            getGraphParamsWrapper={getGraphParamsWrapper}
                            lastRefreshedTime={lastGraphRefreshedTime}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default StoreManage;
