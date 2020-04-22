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

import { useAuth0 } from "../react-auth0-spa";

import axios from "axios";
import { API_URL } from "../constants";

import graph_placeholder from "../graph_placeholder.png";

import ConfirmRemovalModal from "./ConfirmRemovalModal";
import NewStoreModal from "./NewStoreModal";

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
      description: "yadayada",
      owner_id: "rando"
    }
    await axios.post(API_URL + "stores/", mockStore);
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
            {
              !data || data.length <= 0 ?
                (<Col>
                  Nothing to display
                </Col>)
                : (
                  data.map(store => (
                    <Row style={{ backgroundColor: '#f1f1f1' }} >
                      <Col m="2"><CardImg src={graph_placeholder} alt="graph" /></Col>
                      <Col m="4">
                        <Row>
                          <h2>{store.name}</h2>
                        </Row>
                        <Row>
                          <CardText>{store.description}</CardText>
                          <p>#Items: 99</p>
                          <p>Status: active</p>
                        </Row>
                        <Row />
                        <Row>
                          {/* <Col/> */}
                          <div className="ml-auto">
                            <NewStoreModal
                              resetState={fetchData}
                              store={store}
                            />
                            <Button href={"/store/" + store.id}>Manage</Button>
                            {/* </Col>
                               <Col>  */}
                            <ConfirmRemovalModal
                              pk={store.id}
                              resetState={fetchData}
                            />
                          </div>
                        </Row>
                      </Col>
                    </Row>

                  )
                  )
                )
            }
            <Row>
              <Card>
                <CardBody>
                  <CardTitle>Create a new store</CardTitle>
                  <Button onClick={create} >+ Create</Button>
                </CardBody>
              </Card>
            </Row>

          </Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;