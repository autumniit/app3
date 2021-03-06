import React, { useState, useEffect } from "react";
import { Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../../constants";
import Button from "components/CustomButton/CustomButton.jsx";

const ItemTableCard = (props) => {

    const [itemEdit, setItemEdit] = useState();
    const [editItemId, setEditItemId] = useState();
    const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date().toLocaleString());

    // Axios Hooks -----

    const [{ data: items, loading: l2, error: e2 }, reGetItems] = useAxios(API_URL + "stores/" + props.storeId + "/items/");

    const reGetItemsWrapper = () => {
        setLastRefreshedTime(new Date().toLocaleString());
        reGetItems();
    }

    useEffect(() => {
        reGetItemsWrapper();
    }, [])

    const [{ loading: l4, error: e4 }, putItemEdit]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + editItemId,
            method: "PUT"
        },
            { manual: true }
        );

    const [{ loading: l5, error: e5 }, deleteItemEdit]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/" + editItemId,
            method: "DELETE"
        },
            { manual: true }
        );
    const [{ loading: l6, error: e6 }, postItem]
        = useAxios({
            url: API_URL + "stores/" + props.storeId + "/items/",
            method: "POST"
        },
            { manual: true }
        );

    // Behavior Functions --------

    const toggleItemEditOn = (editingId) => {
        setEditItemId(editingId);
    }

    const toggleItemEditOff = () => {
        setEditItemId();
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
        reGetItemsWrapper();
        toggleItemEditOff();
    }

    const removeItemEdit = async () => {
        console.log("[item] delete id:", editItemId);
        await deleteItemEdit();
        reGetItemsWrapper();
        toggleItemEditOff();
    }

    const addItem = async () => {
        var item = {
            id: 0,
            name: "New Item",
            current_price_point: null,
            store: props.storeId
        }
        console.log("[item] add:", item);
        await postItem({ data: item });
        reGetItemsWrapper();
    }


    // Safe loading
    if (l2) return <p>Loading...</p>
    if (e2) return <p>Error!</p>

    var plain = false;
    var hCenter = false;

    return (
        <div className={"card" + (plain ? " card-plain" : "")}>
            <div className={"header" + (hCenter ? " text-center" : "")}>
                <h4 className="title">Items</h4>
                <p className="category">{(props.stores && props.storeId) ?
                    "Browse, add, or edit items for " + props.stores.find(obj => { return obj.id === parseInt(props.storeId) }).name + " here"
                    :
                    ""
                }</p>
            </div>
            <div
                className={"content"}
            >

                <Table hover>
                    <thead>
                        <tr>
                            {/* {["ID", "Name", "PricePoint", "Actions"].map((prop, key) => {
                                return <th width="100" key={key}>{prop}</th>;
                            })} */}
                            <th width="20">ID</th>
                            <th width="150">Name</th>
                            <th width="40">PricePoint</th>
                            <th width="150">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items ?
                                items.map((prop, key) => {
                                    return (
                                        <tr key={key}>
                                            <td width="20" key="id">{prop.id}</td>
                                            {
                                                (prop.id === editItemId) ?
                                                    (
                                                        <td width="150">
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
                                                        <td width="150" key="itemName">{prop.name}</td>
                                                    )
                                            }
                                            <td width="40" key="currentPricePoint">{prop.current_price_point}</td>
                                            {/* <td key="store">{prop.store}</td> */}

                                            {
                                                (prop.id === editItemId) ?
                                                    (
                                                        <td width="150">
                                                            <Button simple onClick={() => saveItemEdit()} ><i className="pe-7s-diskette" /></Button>
                                                            <Button simple onClick={() => removeItemEdit()} ><i className="pe-7s-trash" /></Button>
                                                            <Button simple onClick={() => toggleItemEditOff()}><i className="pe-7s-close-circle" /></Button>
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td width="150">
                                                            <Button simple onClick={() => toggleItemEditOn(prop.id)}><i className="pe-7s-config" /></Button>
                                                            <Button simple onClick={() => props.setPricePointId(prop.id)}><i className="pe-7s-angle-right-circle" /></Button>
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
                                <Button simple onClick={() => addItem()} ><i className="pe-7s-plus" /> Create New</Button>
                            </td>
                        </tr>

                    </tbody>
                </Table>


                <div className="footer">
                    <div className="stats">
                        {<i className="pe-7s-refresh-2" onClick={() => reGetItemsWrapper()} />} Last refreshed: {lastRefreshedTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemTableCard;