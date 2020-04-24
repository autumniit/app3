import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

class NewPricePointForm extends React.Component {
  state = {
    id: 0,
    price_point: 0,
    alpha: 0,
    beta: 0,
    item: 0
  };

  componentDidMount() {
    if (this.props.pricePoint) {
      const { id, price_point, alpha, beta, item } = this.props.pricePoint;
      this.setState({ id, price_point, alpha, beta, item });
    } else {
      const item = this.props.item;
      this.setState({ item });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPricePoint = e => {
    e.preventDefault();
    axios.post(API_URL + "stores/" + this.props.store + "/items/" + this.state.item + "/price_points/", this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPricePoint = e => {
    e.preventDefault();
    console.log(this.state);
    axios.put(API_URL + "stores/" + this.props.store + "/items/" + this.state.item + "/price_points/" + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.pricePoint ? this.editPricePoint : this.createPricePoint}>
        <FormGroup>
          <Label for="price_point">price_point:</Label>
          <Input
            type="float"
            name="price_point"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.price_point)}
          />
          <Label for="alpha">alpha:</Label>
          <Input
            type="float"
            name="alpha"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.alpha)}
          />
          <Label for="beta">beta:</Label>
          <Input
            type="float"
            name="beta"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.beta)}
          />

        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewPricePointForm;