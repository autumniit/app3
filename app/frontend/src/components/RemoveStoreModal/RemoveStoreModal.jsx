import React, { Fragment, useState } from "react";

import { Modal, Badge } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";

const RemoveStoreModal = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>

      <Button simple onClick={handleShow}>
        <i className="pe-7s-trash" />
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title><Badge color="primary">StoreID: {props.storeId}</Badge> Removing Store</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={() => (handleClose(), props.removeStore(props.storeId))}>
            Remove
          </Button>
        </Modal.Footer>

      </Modal>

    </Fragment>
  );
}

export default RemoveStoreModal;