import { useAuth0 } from "../react-auth0-spa";

import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";

import StoreCard from "components/StoreCard/StoreCard.jsx";

const StoreList = (props) => {

    const { loading, user } = useAuth0();

    const [{ data: stores, loading: l1, error: e1 }, getStores] = useAxios(API_URL + "stores/");

    useEffect(() => {
        getStores();
    }, []);

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    {(stores && user) ?
                        stores.filter(obj => { return obj.owner_id === user.email }).map((store, key) => (
                            <Col lg={3} sm={6} key={key}>
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
