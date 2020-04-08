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

const Dashboard = () => {
  const { loading, user } = useAuth0();

  const [text, setText] = useState("abc")
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL + "stores");
      setData(result.data);
    };

    
    fetchData();
    // console.log(data)
  }, []);

  if (loading || !user) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          {/* <Media style={{ maxHeight: 1800, maxWidth: 500 }} src={dashmock} alt="dashmock" /> */}
          <Container>
            TEST:
            <Row>
              {
                !data || data.length <= 0 ?
                  (<Col>
                    Nothing
                  </Col>)
                  : (
                    data.map(store => (
                      <Col>
                        <div>
                          <Card>
                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                            <CardBody>
                              <CardTitle> {store.owner_id}</CardTitle>
                              <CardSubtitle>Card subtitle</CardSubtitle>
                              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                              <Button>Button</Button>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                    )))}

            </Row>


          </Container>
        </Col>
      </Row>


    </Fragment>
  );
};

export default Dashboard;