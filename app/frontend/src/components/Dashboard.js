import React, { Fragment, useState, useEffect } from "react";
import {
  Media,
  Row,
  Col,
  Container,
  Card,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardBody,
  CardText,
  Button
} from "reactstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import dashmock from "../dashmock.png"

import { useAuth0 } from "../react-auth0-spa";
import Sidebar from "./Sidebar";

import axios from "axios";
import { API_URL } from "../constants";

import graph_placeholder from "../graph_placeholder.png";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState();

  let match = useRouteMatch();

  const fetchData = async () => {
    const result = await axios(API_URL + "stores/");
    setData(result.data);
    console.log(result.data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const create = async () => {
    const mockStore = {
      id: 0,
      name: "mock",
      owner_id: "rando"
    }
    await axios.post(API_URL + "stores/", mockStore);
    fetchData()
  }

  const deleteStore = async () => {
    const pk = 0
    await axios.post(API_URL + "stores/" + pk);
    fetchData()
  }

  if (loading || !user) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <Container>
            <Row>
              {
                !data || data.length <= 0 ?
                  (<Col>
                    Nothing to display
                  </Col>)
                  : (
                    data.map(store => (
                      <Col key={"store_card_" + store.id}>  {/* TODO: get a proper key*/}
                        <div>
                          <Card>
                            <CardImg top width="100%" src={graph_placeholder} alt="Card image cap" />
                            <CardBody>
                              <CardTitle>{store.name}</CardTitle>
                              <CardSubtitle>Card subtitle</CardSubtitle>
                              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                              <Button href={"/store/" + store.id}>Manage</Button>
                              <ConfirmRemovalModal
                                pk={store.id}
                                resetState={fetchData}
                              />
                            </CardBody>
                          </Card>

                        </div>
                      </Col>
                    )
                    )
                  )
              }
              <Col>
                <div>
                  <Card>
                    <CardBody>
                      <CardTitle>Create a new store</CardTitle>
                      <Button onClick={create} >+ Create</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>

            </Row>


          </Container>
        </Col>
      </Row>


    </Fragment>
  );
};

export default Dashboard;