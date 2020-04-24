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

import { useAuth0 } from "../../react-auth0-spa";

import axios from "axios";
import { API_URL } from "../../constants";

import ConfirmStoreRemovalModal from "./ConfirmStoreRemovalModal";
import EditStoreModal from "./EditStoreModal";

const StoreList = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState();

  const fetchData = async () => {
    const result = await axios(API_URL + "stores/");
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
                  Nothing to display
                </Col>)
                : (
                  data.map(store => (

                    {/* Store list element */ },
                    <Row style={{ backgroundColor: '#f1f1f1' }} >
                      <Col m="4">
                        <Row>
                          <h4><Badge color="secondary">StoreID: {store.id}</Badge> {store.name} </h4>
                          <div className="ml-auto">
                            <ButtonGroup>
                              <Button color="primary" href={"/store/" + store.id + "/manage"}>Manage</Button>
                              <EditStoreModal
                                resetState={fetchData}
                                store={store}
                              />
                              <ConfirmStoreRemovalModal
                                resetState={fetchData}
                                pk={store.id}
                              />
                            </ButtonGroup>
                          </div>
                        </Row>
                        <Row>
                          <CardText>{store.description}</CardText>
                          {/* #Items: 99
                          Status: active */}
                        </Row>
                        <Row />
                      </Col>
                    </Row>


                  )
                  )
                )
            }
            <Row>
              <EditStoreModal
                resetState={fetchData}
                create={true}
              />
            </Row>

          </Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default StoreList;