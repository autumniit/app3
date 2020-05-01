import { useAuth0 } from "../react-auth0-spa";

import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";

import StoreCard from "components/StoreCard/StoreCard.jsx";

const StoreList = (props) => {

    const { loading, user, isAuthenticated } = useAuth0();
    const [{ data: allStores, loading: l1, error: e1 }, getAllStores] = useAxios(API_URL + "stores/");

    if (loading) return (
        <div className="content">
            <Grid fluid>
                <Row>
                    Loading ...
            </Row>
            </Grid>
        </div>
    )

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    {(allStores && allStores.filter(obj => { return obj.owner_id === user.email })) ?
                        allStores.map((store, key) => (
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
