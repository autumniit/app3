import React, { Fragment, useState } from "react";
import { Button, Modal, Badge } from "react-bootstrap";
import EditStoreForm from "./EditStoreForm.jsx";

const EditStoreModal = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>

      {/* <Button onClick={handleShow}> */}
      <i className="fa fa-gear" onClick={handleShow} />
      {/* </Button> */}

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title><Badge color="primary">StoreID: {props.store.id}</Badge> Editing Store</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button bsStyle="info" pullRight fill type="submit" onClick={handleClose}> */}
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>

      </Modal>

    </Fragment>
  );
}

export default EditStoreModal;