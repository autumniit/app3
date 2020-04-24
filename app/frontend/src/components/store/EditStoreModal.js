import React, { Component, Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Badge } from "reactstrap";
import EditStoreForm from "./EditStoreForm";

const EditStoreModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => { setModal(!modal) };

  const create = props.create;

  var title;
  var badge;
  var button;

  if (create) {
    title = "Creating New Store";
    badge = null
    button = (
      <Button
        color="primary"
        className="float-right"
        onClick={toggle}
        style={{ minWidth: "200px" }}
      >
        Create New Store
      </Button>
    );
  }
  else {
    title = "Editing Store";
    badge = <Badge color="secondary">StoreID: {props.store.id}</Badge>;
    button = <Button onClick={toggle}>Edit</Button>;
  }

  return (
    <Fragment>
      {button}
      <Modal isOpen={modal} toggle={toggle}>

        <ModalHeader toggle={toggle}>{badge} {title}</ModalHeader>

        <ModalBody>
          <EditStoreForm
            resetState={props.resetState}
            toggle={toggle}
            store={props.store}
          />
        </ModalBody>

      </Modal>
    </Fragment>
  );
}

export default EditStoreModal;