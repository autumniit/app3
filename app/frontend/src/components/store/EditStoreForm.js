import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../../constants";

const EditStoreForm = (props) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner_id, setOwnerId] = useState(0);

  useEffect(() => {
    if (props.store) {
      const { id, name, description, owner_id } = props.store;
      setId(id);
      setName(name);
      setDescription(description);
      setOwnerId(owner_id);
    }
  }, [])

  var ch = "A";
  const [chageDetected, setChange] = useState("");
  useEffect(() => {
    setChange("*");
    ch = "B";
  }, [name])

  const createStore = async e => {
    e.preventDefault();
    await axios.post(API_URL + "stores/", { id, name, description, owner_id });
    props.resetState();
    props.toggle();
  };

  const editStore = async e => {
    e.preventDefault();
    console.log({ id, name, description, owner_id });
    await axios.put(API_URL + "stores/" + id, { id, name, description, owner_id });
    props.resetState();
    props.toggle();
  };

  const defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  return (
    <Form onSubmit={props.store ? editStore : createStore}>
      {name}
      {chageDetected}
      {ch}
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={defaultIfEmpty(name)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description:</Label>
        <Input
          type="text"
          name="description"
          onChange={e => setDescription(e.target.value)}
          value={defaultIfEmpty(description)}
        />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
}

export default EditStoreForm;