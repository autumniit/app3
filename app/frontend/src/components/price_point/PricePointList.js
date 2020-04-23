import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  CardText,
  Button,
  ButtonGroup,
  Badge
} from "reactstrap"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { useAuth0 } from "../../react-auth0-spa";

import axios from "axios";
import { API_URL } from "../../constants";

import ConfirmPricePointRemovalModal from "./ConfirmPricePointRemovalModal";
import NewPricePointModal from "./NewPricePointModal";

const PricePointList = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState();

  let match = useRouteMatch();

  let { store, item } = useParams();

  const fetchData = async () => {
    const result = await axios(API_URL + "stores/" + store + "/items/" + item + "/price_points");
    setData(result.data);
    console.log(result.data)
  };

  useEffect(() => {
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
            {
              !data || data.length <= 0 ?
                (<Col>
                  No price points to display
                </Col>)
                : (
                  data.map(pricePoint => (
                    <Row style={{ backgroundColor: '#f1f1f1' }} >
                      <Col m="4">
                        <Row>
                          <h4><Badge color="secondary">ID: {pricePoint.id}</Badge> {pricePoint.price_point} </h4>
                          {pricePoint.alpha}
                          {pricePoint.beta}

                          <div className="ml-auto">
                            <ButtonGroup>
                              <NewPricePointModal
                                resetState={fetchData}
                                store={store}
                                pricePoint={pricePoint}
                              />
                              <ConfirmPricePointRemovalModal
                                pk={pricePoint.id}
                                resetState={fetchData}
                                store={store}
                                item={item}
                              />
                            </ButtonGroup>
                          </div>
                        </Row>
                        <Row>
                        </Row>
                        <Row />
                      </Col>
                    </Row>

                  )
                  )
                )
            }
            <Row>
              <NewPricePointModal
                resetState={fetchData}
                create={true}
                store={store}
                item={item}
              />
            </Row>

          </Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PricePointList;