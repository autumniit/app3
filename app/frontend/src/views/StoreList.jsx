import { useAuth0 } from "../react-auth0-spa";

import React, { useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Route, Switch, BrowserRouter } from "react-router-dom"

import useAxios, { configure } from "axios-hooks"
import { API_URL } from "../constants";

import StoreCard from "components/StoreCard/StoreCard.jsx";
import StoreManage from "./StoreManage";
import Button from "components/CustomButton/CustomButton.jsx";

configure({ cache: false })

const StoreList = (props) => {

    const { loading, user } = useAuth0();

    const [{ data: allStores, loading: l1, error: e1 }, getAllStores] = useAxios(API_URL + "stores/");

    const [{ loading: l2, error: e2 }, postStore] = useAxios(
        {
            url: API_URL + "stores/",
            method: "POST"
        },
        { manual: true }
    );

    const [{ loading: l3, error: e3 }, deleteStore] = useAxios(
        {
            url: API_URL + "stores/",
            method: "DELETE"
        },
        { manual: true }
    );


    const addStore = async () => {
        var store = {
            id: 0,
            name: "New Store",
            description: "New Description",
            owner_id: user.email
        }
        console.log("[store] add: ", store);
        await postStore({ data: store });
        getAllStores();
    }

    const removeStore = async (storeId) => {
        console.log("[store] delete id: ", storeId);
        await deleteStore({
            url: API_URL + "stores/" + storeId
        });
        getAllStores();
    }

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
        <BrowserRouter>
            <Switch>
                <Route
                    path="/stores"
                    render={props => (
                        <div className="content">
                            <Grid fluid>
                                <Row>
                                    {(allStores && allStores.filter(obj => { return obj.owner_id === user.email })) ?
                                        allStores.map((store, key) => (
                                            <Col lg={3} sm={6} key={key}>
                                                <StoreCard
                                                    store={store}
                                                    bigIcon={<i className="pe-7s-cart" />}
                                                    statsIcon={<i className="fa fa-refresh" />}
                                                    statsIconText="Updated just now"
                                                    settingIcon={<i className="pe-7s-config" />}
                                                    removeStore={removeStore}
                                                    getAllStores={getAllStores}
                                                />
                                            </Col>
                                        ))
                                        :
                                        "Nothing to display"
                                    }
                                    <Col lg={3} sm={6}>
                                        <Button block onClick={() => addStore()}> + Add New Store </Button>
                                    </Col>

                                </Row>

                            </Grid>
                        </div>
                    )}
                />

                <Route
                    path="/store/:storeId"
                    render={props => (
                        <StoreManage
                            stores={allStores}
                        />
                    )}
                />

            </Switch>
        </BrowserRouter>

    );
}

export default StoreList;
