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
import dashmock from "../dashmock.png"


import { useAuth0 } from "../react-auth0-spa";
import Sidebar from "./Sidebar";

import axios from "axios";
import { API_URL } from "../constants";

import graph_placeholder from "../graph_placeholder.png"

const Dashboard = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL + "stores");
      setData(result.data);
      console.log(result.data)
    };


    fetchData();
  }, []);

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
                    Nothing
                  </Col>)
                  : (
                    data.map(store => (
                      <Col key={"store_card_" + store.id}>
                        <div>
                          <Card>
                            <CardImg top width="100%" src={graph_placeholder} alt="Card image cap" />
                            <CardBody>
                              <CardTitle>{store.id}</CardTitle>
                              <CardSubtitle>Card subtitle</CardSubtitle>
                              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                              <Button>Button</Button>
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
                      <Button>+ Create</Button>
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