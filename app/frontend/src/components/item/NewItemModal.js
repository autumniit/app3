import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, Badge } from "reactstrap";
import NewStoreForm from "./NewItemForm";

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
      title = "Creating New Item for Store:" + this.props.store;
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
      const {id} = this.props.item;
      title = "Editing Item";
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
            <NewStoreForm
              resetState={this.props.resetState}
              toggle={this.toggle}
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