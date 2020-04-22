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

import ConfirmRemovalModal from "./ConfirmRemovalModal";
import NewStoreModal from "./NewStoreModal";

// CanvasJS
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ItemList = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState();

  let match = useRouteMatch();

  let { storeId } = useParams();

  const fetchData = async () => {
    const result = await axios(API_URL + "stores/" + storeId + "/items/");
    setData(result.data);
    console.log(result.data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !user) {
    return <div>Loading Dashboard...</div>;
  }

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Bounce Rate by Week of Year"
    },
    axisY: {
      title: "Bounce Rate",
      includeZero: false,
      suffix: "%"
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}%",
      dataPoints: [
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 6, y: 60 },
        { x: 7, y: 58 },
        { x: 8, y: 59 },
        { x: 9, y: 53 },
        { x: 10, y: 54 },
        { x: 11, y: 61 },
        { x: 12, y: 60 },
        { x: 13, y: 55 },
        { x: 14, y: 60 },
        { x: 15, y: 56 },
        { x: 16, y: 60 },
        { x: 17, y: 59.5 },
        { x: 18, y: 63 },
        { x: 19, y: 58 },
        { x: 20, y: 54 },
        { x: 21, y: 59 },
        { x: 22, y: 64 },
        { x: 23, y: 59 }
      ]
    }]
  }

  return (
    <Fragment>
      {/* CanvasJS Demo */}
      <h1>React Line Chart</h1>
      <CanvasJSChart options={options}
      /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}


      <Row>
        <Col>
          <Container>
            {
              !data || data.length <= 0 ?
                (<Col>
                  No items to display
                </Col>)
                : (
                  data.map(item => (
                    <Row style={{ backgroundColor: '#f1f1f1' }} >
                      <Col m="4">
                        <Row>
                          <h4><Badge color="secondary">ID: {item.id}</Badge> {item.name} </h4>
                          {/* <div className="ml-auto">
                            <ButtonGroup>
                              <Button color="primary" href={"/store/" + item.id}>Manage</Button>
                              <NewStoreModal
                                resetState={fetchData}
                                item={item}
                              />
                              <ConfirmRemovalModal
                                pk={item.id}
                                resetState={fetchData}
                              />
                            </ButtonGroup>
                          </div> */}
                        </Row>
                        <Row>
                          <CardText>price</CardText>
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
            {/* <Row>
              <NewStoreModal
                resetState={fetchData}
                create={true}
              />
            </Row> */}

          </Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ItemList;