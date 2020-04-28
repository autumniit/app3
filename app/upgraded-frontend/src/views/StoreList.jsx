import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import axios from "axios";
import { API_URL } from "../constants";

import StoreCard from "components/StoreCard/StoreCard.jsx";

const StoreList = (props) => {

    const [stores, setStores] = useState();

    const fetchData = async () => {
        const result = await axios(API_URL + "stores/");
        setStores(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    {stores ?
                        stores.map((store, key) => (
                            <Col lg={3} sm={6}>
                                <StoreCard
                                    store={store}
                                    bigIcon={<i className="pe-7s-cart text-success" />}
                                    statsIcon={<i className="fa fa-refresh" />}
                                    statsIconText="Updated just now"
                                    settingIcon={<i className="pe-7s-config" />}
                                />
                            </Col>
                        ))
                        :
                        "Nothing to display"
                    }
                </Row>
            </Grid>
        </div>
    );
}

export default StoreList;
