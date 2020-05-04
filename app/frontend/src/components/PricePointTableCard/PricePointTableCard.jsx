import React, { useState, useEffect } from "react";
import { Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../../constants";
import { Card } from "components/Card/Card.jsx";

const PricePointTableCard = (props) => {

    const [pricePointEdit, setPricePointEdit] = useState()
    const [editPricePointId, setEditPricePointId] = useState();
    const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date().toLocaleString());

    // Axios Hooks -----

    const [{ data: pricePoints, loading: l3, error: e3 }, getPricePoints]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + props.pricePointId + "/price_points",
            method: "GET"
        },
            { manual: true }
        );

    const getPricePointsWrapper = () => {
        setLastRefreshedTime(new Date().toLocaleString());
        getPricePoints();
    }


    const [{ loading: l4, error: e4 }, postPricePoints]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + props.pricePointId + "/price_points/",
            method: "POST"
        },
            { manual: true }
        );
    const [{ loading: l5, error: e5 }, putPricePoint]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + props.pricePointId + "/price_points/" + editPricePointId,
            method: "PUT"
        },
            { manual: true }
        );

    const [{ loading: l6, error: e6 }, deletePricePoint]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + props.pricePointId + "/price_points/" + editPricePointId,
            method: "DELETE"
        },
            { manual: true }
        );

    // Behavior Functions -----

    useEffect(() => {
        if (props.pricePointId) {
            getPricePointsWrapper();
        }
    }, [props.pricePointId])

    const togglePricePointEditOn = (editingId) => {
        setEditPricePointId(editingId);
    }
    const togglePricePointEditOff = () => {
        setEditPricePointId();
    }

    useEffect(() => {
        if (pricePoints && editPricePointId) {
            setPricePointEdit(pricePoints.find(obj => { return obj.id === editPricePointId }))
        }
    }, [editPricePointId]);

    const onPricePointEdit = e => {
        setPricePointEdit({ ...pricePointEdit, [e.target.name]: e.target.value });
    };

    const savePricePointEdit = async () => {
        console.log("[pricePoint] put:", pricePointEdit);
        await putPricePoint({
            data: pricePointEdit
        });
        getPricePointsWrapper();
        props.getGraphParams();
        togglePricePointEditOff();
    }

    const removePricePointEdit = async () => {
        console.log("[pricePoint] delete id:", editPricePointId);
        await deletePricePoint();
        getPricePointsWrapper();
        props.getGraphParams();
        togglePricePointEditOff();
    }

    const addPricePoint = async () => {
        var pricePoint = {
            id: 0,
            price_point: 0,
            alpha: 10,
            beta: 1,
            item: props.pricePointId,
        }
        console.log("[pricePoint] add:", pricePoint);
        await postPricePoints({ data: pricePoint });
        getPricePointsWrapper();
        props.getGraphParams();
    }

    // Safe loading
    if (l3) return (
        <Card>
            Loading
        </Card>
    )

    if (e3) return <p>Error!</p>

    var plain = false;
    var hCenter = false;

    return (
        <div className={"card" + (plain ? " card-plain" : "")}>
            <div className={"header" + (hCenter ? " text-center" : "")}>
                <h4 className="title">{pricePoints ? props.pricePointId + "'s Price Points" : "Price Points"}</h4>
                <p className="category">{pricePoints ? "Browse, add, or edit price points of " + props.pricePointId + " here" : "Select an item to manage its price points"}</p>
            </div>
            <div
                className={"content"}
            >
                <Table hover>
                    <thead>
                        <tr>
                            {["ID", "PricePoint", "Alpha", "Beta", "Actions"].map((prop, key) => {
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
                                            <td key="id">{prop.id}</td>
                                            {/* Price Point */}
                                            {
                                                (prop.id === editPricePointId) ?
                                                    (
                                                        <td>
                                                            <FormControl
                                                                name="price_point"
                                                                rows="1"
                                                                type="text"
                                                                defaultValue={prop.price_point}
                                                                onChange={(e) => onPricePointEdit(e)}
                                                            />
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td key="pricePoint">{prop.price_point}</td>
                                                    )
                                            }
                                            {/* Alpha */}
                                            {
                                                (prop.id === editPricePointId) ?
                                                    (
                                                        <td>
                                                            <FormControl
                                                                name="alpha"
                                                                rows="1"
                                                                type="text"
                                                                defaultValue={prop.alpha}
                                                                onChange={(e) => onPricePointEdit(e)}
                                                            />
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td key="alpha">{prop.alpha}</td>
                                                    )
                                            }
                                            {/* Beta*/}
                                            {
                                                (prop.id === editPricePointId) ?
                                                    (
                                                        <td>
                                                            <FormControl
                                                                name="beta"
                                                                rows="1"
                                                                type="text"
                                                                defaultValue={prop.beta}
                                                                onChange={(e) => onPricePointEdit(e)}
                                                            />
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td key="beta">{prop.beta}</td>
                                                    )
                                            }
                                            {/* Actions */}
                                            {
                                                (prop.id === editPricePointId) ?
                                                    (
                                                        <td>
                                                            <i className="pe-7s-diskette" onClick={() => savePricePointEdit()} />
                                                            <i className="pe-7s-trash" onClick={() => removePricePointEdit()} />
                                                            <i className="pe-7s-close-circle" onClick={() => togglePricePointEditOff()} />
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td>
                                                            <i className="pe-7s-config" onClick={() => togglePricePointEditOn(prop.id)} />
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
                        {
                            props.pricePointId ?
                                (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <i className="pe-7s-plus" onClick={() => addPricePoint()} />
                                        </td>
                                    </tr>
                                )
                                :
                                null
                        }

                    </tbody>
                </Table>

                {

                    props.pricePointId ?
                        (
                            <div className="footer">
                                <div className="stats">
                                    <i className="pe-7s-refresh-2" onClick={() => getPricePointsWrapper()} />Last refreshed: {lastRefreshedTime}
                                </div>
                            </div>
                        )
                        :
                        null
                }
            </div>
        </div>
    );
}

export default PricePointTableCard;