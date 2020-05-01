import React, { useState, useEffect } from "react";
import { Table, FormControl } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../../constants";
import { Card } from "components/Card/Card.jsx";

const ItemTableCard = (props) => {

    const [itemEdit, setItemEdit] = useState()
    const [editItemId, setEditItemId] = useState();

    // Axios Hooks -----

    const [{ data: items, loading: l2, error: e2 }, reGetItems] = useAxios(API_URL + "stores/" + props.storeId + "/items/");

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
        reGetItems();
        toggleItemEditOff();
    }

    const removeItemEdit = async () => {
        console.log("[item] delete id:", editItemId);
        await deleteItemEdit();
        reGetItems();
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
        reGetItems();
    }


    // Safe loading
    // if (l2) return <p>Loading...</p>
    // if (e2) return <p>Error!</p>

    return (
        <Card
            title="Items"
            category={(props.stores && props.storeId) ?
                "Browse, add, or edit items for " + props.stores.find(obj => { return obj.id === parseInt(props.storeId) }).name + " here"
                :
                ""
            }
            ctTableFullWidth
            ctTableResponsive
            content={
                <Table hover >
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
                                                            <i className="pe-7s-angle-right-circle" onClick={() => props.setPricePointId(prop.id)} />
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
    );
}

export default ItemTableCard;