import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { Card } from "components/Card/Card.jsx";

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

    const [itemEdit, setItemEdit] = useState()
    const [editItemId, setEditItemId] = useState();

    const [{ data: stores, loading: l1, error: e1 }] = useAxios(API_URL + "stores/");
    const [{ data: items, loading: l2, error: e2 }, reGetItems] = useAxios(API_URL + "stores/" + storeId + "/items/");
    const [{ data: pricePoints, loading: l3, error: e3 }, getPricePoints]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + pricePointId + "/price_points",
            method: "GET"
        },
            { manual: true }
        );

    const [{ loading: l4, error: e4 }, putItemEdit]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + editItemId,
            method: "PUT"
        },
            { manual: true }
        );

    const [{ loading: l5, error: e5 }, deleteItemEdit]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + editItemId,
            method: "DELETE"
        },
            { manual: true }
        );
    const [{ loading: l6, error: e6 }, postItem]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/",
            method: "POST"
        },
            { manual: true }
        );

    useEffect(() => {
        if (pricePointId) {
            getPricePoints();
        }
    }, [pricePointId])


    const toggleItemEditOn = (editingId) => {
        setEditItemId(editingId);
    }

    useEffect(() => {
        if (items && editItemId) {
            setItemEdit(items.find(obj => { return obj.id === editItemId }))
        }
    }, [editItemId]);

    const onItemEdit = e => {
        setItemEdit({ ...itemEdit, [e.target.name]: e.target.value });
    };

    const saveItemEdit = async () => {
        console.log("[item] put:", itemEdit);
        await putItemEdit({
            data: itemEdit
        });
        reGetItems();
        toggleItemEditOff();
    }

    const removeItemEdit = async () => {
        console.log("[item] delete id:", editItemId);
        await deleteItemEdit();
        reGetItems();
        toggleItemEditOff();
    }

    const toggleItemEditOff = () => {
        setEditItemId();
    }

    const addItem = async () => {
        var item = {
            id: 0,
            name: "New Item",
            current_price_point: null,
            store: storeId
        }
        console.log("[item] add:", item);
        await postItem({ data: item });
        reGetItems();
    }


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

    if (l1 || l2 || l3) return <p>Loading...</p>
    if (e1 || e2 || e3) return <p>Error!</p>

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
                    <Card
                        title="Items"
                        category={(stores && storeId) ? "Browse, add, or edit items for " + stores.find(obj => { return obj.id === parseInt(storeId) }).name + " here" : ""}
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table hover>
                                <thead>
                                    <tr>
                                        {["ID", "Name", "PricePoint", "Actions"].map((prop, key) => {
                                            return <th key={key}>{prop}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items ?
                                            items.map((prop, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td key="id">{prop.id}</td>
                                                        {
                                                            (prop.id === editItemId) ?
                                                                (
                                                                    <td>
                                                                        <FormControl
                                                                            name="name"
                                                                            rows="1"
                                                                            type="text"
                                                                            defaultValue={prop.name}
                                                                            onChange={(e) => onItemEdit(e)}
                                                                        />
                                                                    </td>
                                                                )
                                                                :
                                                                (
                                                                    <td key="itemName">{prop.name}</td>
                                                                )
                                                        }
                                                        <td key="currentPricePoint">{prop.current_price_point}</td>
                                                        {/* <td key="store">{prop.store}</td> */}

                                                        {
                                                            (prop.id === editItemId) ?
                                                                (
                                                                    <td>
                                                                        <i className="pe-7s-diskette" onClick={() => saveItemEdit()} />
                                                                        <i className="pe-7s-trash" onClick={() => removeItemEdit()} />
                                                                        <i className="pe-7s-close-circle" onClick={() => toggleItemEditOff()} />
                                                                    </td>
                                                                )
                                                                :
                                                                (
                                                                    <td>
                                                                        <i className="pe-7s-config" onClick={() => toggleItemEditOn(prop.id)} />
                                                                        <i className="pe-7s-angle-right-circle" onClick={() => setPricePointId(prop.id)} />
                                                                    </td>
                                                                )
                                                        }


                                                    </tr>
                                                );
                                            })
                                            :
                                            null
                                    }

                                    {/* Add new item */}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        {/* <td></td> */}
                                        <td>
                                            <i className="pe-7s-plus" onClick={() => addItem()} />
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        }
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
