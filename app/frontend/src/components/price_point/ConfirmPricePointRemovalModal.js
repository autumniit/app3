import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, Badge } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deletePricePoint = async (pk) => {
    await axios.delete(API_URL + "stores/" + this.props.store + "/items/" + this.props.item + "/price_points/" + pk);
    this.props.resetState()
    this.toggle()
  }

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>

          <ModalHeader toggle={this.toggle}>
            <Badge color="secondary">ID: {this.props.pk}</Badge>
            Do you really wanna delete the price point?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deletePricePoint(this.props.pk)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;