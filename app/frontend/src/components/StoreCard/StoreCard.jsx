import React, { } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import EditStoreModal from "../EditStoreModal/EditStoreModal.jsx"
import RemoveStoreModal from "../RemoveStoreModal/RemoveStoreModal.jsx"
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


            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
              to={"/store/" + props.store.id}
            >
              <Button simple>
                <i className="pe-7s-note" />
              </Button>
            </NavLink>


            <EditStoreModal
              store={props.store}
              getAllStores={props.getAllStores}
            />

            <RemoveStoreModal
              removeStore={props.removeStore}
              storeId={props.store.id}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
