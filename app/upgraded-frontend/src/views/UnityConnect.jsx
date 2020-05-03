import React, { Component, useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

const UnityConnect = () => {

  // var r;
  // const [text, setText] = useState("")
  // useEffect(async () => {
  //   r = await fetch('/sample.txt')
  //   setText(await r.text())
  // }, [])


  return (
    <>
      <div className="typo-line">
        <h2>
          Connect to Unity <br />
          <small>Follow these simple steps to have your own dynamic pricing system integrated into your game.</small>
        </h2>
      </div>
      <div className="typo-line">
        <p>
          1) Create a store. Here you can specify its name and description. <br />
          2) In Manage, click <i className="pe-7s-plus" /> to create a new store. Set its name and description.<br />
          3) Click <i className="pe-7s-note" /> to get to Store Manage. Create an item. Specify its name.<br />
          4) Click on <i className="pe-7s-angle-right-circle" /> to view all price points associated with the item. (There will be none, as the item has just been created)<br />
          5) Create possible price points for your item for the model to explore.<br />
          6) Note down StoreID and ItemID of the item, they will be required in later steps.<br />
          7) In your Unity Project, create a new object. In this example, we will name it “DP Integrator”.<br />
          8) Add the following scripts to the object. The script’s name is irrelevant (in this example: DPAppIntegratorScript.cs)<br />
        </p>
      </div>
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={1} sm={1} />
            <Col lg={10} sm={10}>
              <Card
                content=
                {
                  <div className="typo-line">
                    <p className="code">

                      {/* {text} */}

                    </p>
                  </div>
                }
              />
            </Col>
            <Col lg={1} sm={1} />
          </Row>
        </Grid>
      </div>
      <div className="typo-line">
        <p>
          9) Everything is now ready. You can start using the functions available in the script. Here are brief explanations of what each functions do to get you started:<br />
        10) An example of a an item in a store that updates its price every 10 seconds can be found here: <br />
        </p>
      </div>

    </>
  );
}


export default UnityConnect;
