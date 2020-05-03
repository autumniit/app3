import React, { } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import EditStoreModal from "../EditStoreModal/EditStoreModal.jsx"
import Button from "components/CustomButton/CustomButton.jsx";

const StoreCard = (props) => {
  return (
    <div className="card card-stats">
      <div className="content">
        <Row>
          <Col xs={5}>
            <div className="icon-big text-center icon-warning">
              {props.bigIcon}
            </div>
          </Col>
          <Col xs={7}>
            <div className="numbers">
              <p><Badge variant="primary"> {"StoreID:" + props.store.id}</Badge></p>
              {props.store.name}
            </div>
          </Col>
        </Row>
        <div className="footer">
          <hr />
          <div className="stats">

          </div>
          <div className="stats pull-right">

            <Button simple>
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={"/store/" + props.store.id}
              >
                <i className="pe-7s-note" />
              </NavLink>
            </Button>

            <EditStoreModal
              store={props.store}
              getAllStores={props.getAllStores}
            />

            <Button simple><i className="pe-7s-trash" onClick={() => props.removeStore(props.store.id)} /></Button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
