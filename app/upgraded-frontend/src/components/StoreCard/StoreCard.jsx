import React, { } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import EditStoreModal from "../EditStoreModal/EditStoreModal.jsx"

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
            {props.statsIcon} {props.statsIconText}
          </div>
          <div className="stats">
            <EditStoreModal
              store={props.store}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
