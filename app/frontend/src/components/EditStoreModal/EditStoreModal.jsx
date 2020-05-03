import React, { Fragment, useState } from "react";

import useAxios from "axios-hooks"

import { API_URL } from "../../constants";
import { Modal, Badge, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

const EditStoreModal = (props) => {

  const [show, setShow] = useState(false);
  const [storeEdit, setStoreEdit] = useState(props.store);

  const [{ loading: l1, error: e1 }, putStore]
    = useAxios({
      url: API_URL + "stores/" + props.store.id,
      method: "PUT"
    },
      { manual: true }
    );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveStoreEdit = async () => {
    console.log("[store] put:", storeEdit);
    await putStore({
      data: storeEdit
    });
    props.getAllStores();
    handleClose();
  }

  const onStoreEdit = e => {
    setStoreEdit({ ...storeEdit, [e.target.name]: e.target.value });
  };



  return (
    <Fragment>

      <Button simple onClick={handleShow}>
        <i className="fa fa-gear" />
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title><Badge color="primary">StoreID: {props.store.id}</Badge> Editing Store</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            name="name"
            rows="1"
            type="text"
            defaultValue={props.store.name}
            onChange={(e) => onStoreEdit(e)}
          />
          <ControlLabel>Description:</ControlLabel>
          <FormControl
            name="description"
            rows="1"
            type="text"
            defaultValue={props.store.description}
            onChange={(e) => onStoreEdit(e)}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button bsStyle="info" pullRight fill type="submit" onClick={handleClose}> */}
          <Button variant="primary" onClick={saveStoreEdit}>
            Save
          </Button>
        </Modal.Footer>

      </Modal>

    </Fragment>
  );
}

export default EditStoreModal;