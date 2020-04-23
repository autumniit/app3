import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, Badge } from "reactstrap";
import NewPricePointForm from "./NewPricePointForm";

class NewItemModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;
    var title;
    var badge;
    var button;
    
    if (create) {
      title = "Creating New Price Point for Item:" + this.props.item;
      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }
    else {
      const {id} = this.props.pricePoint;
      title = "Editing Price Point";
      badge = <Badge color="secondary">ID: {id}</Badge>;
      button = <Button onClick={this.toggle}>Edit</Button>;
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {badge}
            {title}
          </ModalHeader>

          <ModalBody>
            <NewPricePointForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              pricePoint={this.props.pricePoint}
              item={this.props.item}
              store={this.props.store}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewItemModal;