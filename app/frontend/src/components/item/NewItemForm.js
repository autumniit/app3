import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class NewItemForm extends React.Component {
  state = {
    id: 0,
    name: "",
    store: 0
  };

  componentDidMount() {
    if (this.props.item) {
      const { id, name, store } = this.props.item;
      this.setState({ id, name, store });
    } else {
      const store = this.props.store;
      this.setState({ store });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createItem = e => {
    e.preventDefault();
    axios.post(API_URL + "stores/" + this.state.store + "/items/", this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editItem = e => {
    e.preventDefault();
    console.log(this.state);
    axios.put(API_URL + "stores/" + this.state.store + "/items/" + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.item ? this.editItem : this.createItem}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewItemForm;