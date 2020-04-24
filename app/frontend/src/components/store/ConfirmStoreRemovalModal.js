import React, { Component, Fragment, useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

const ConfirmRemovalModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => {setModal(!modal)};

  const deleteStore = async (pk) => {
    await axios.delete(API_URL + "stores/" + pk);
    props.resetState()
    toggle()
  }

  return (
    <Fragment>
      <Button color="danger" onClick={() => toggle()}>
        Remove
        </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really wanna delete the store?
          </ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
            </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteStore(props.pk)}
          >
            Yes
            </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )

}

export default ConfirmRemovalModal;