import React, { useState, useEffect } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";

import axios from "axios"
import { API_URL } from "../constants";

import Button from "components/CustomButton/CustomButton.jsx"

import CanvasJSReact from 'assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Simulation = (props) => {

    const [simSlope, setSimSlope] = useState(0);
    const [simInterpolate, setSimInterpolate] = useState(0);
    const [xInterval, setXInterval] = useState(10);
    const [simData, setSimData] = useState([]);

    const [storeId, setStoreId] = useState();
    const [itemId, setItemId] = useState();
    const [iterations, setIterations] = useState(1);


    const generateSimulatedDemandParams = () => {
        setSimSlope((Math.random() * -10));
        setSimInterpolate(Math.floor(Math.random() * 100) + 100);
    }

    useEffect(() => {
        // Clear out data points
        setSimData([]);

        // Get 10 sample data points on the demand line
        const temp = [];
        for (let i = 0; i < 10; i++) {
            if (((i * simSlope * xInterval) + simInterpolate) >= 0)
            temp.push({ x: i * xInterval, y: ((i * simSlope * xInterval) + simInterpolate)});
        }
        setSimData(temp);

    }, [xInterval, simSlope, simInterpolate]);

    const simulate = async () => {
        let newPrice;

        for (let i = 0; i < iterations; i++) {
            console.log("newPrice:", newPrice);
            let demand;
            if (newPrice) {
                demand = parseFloat(newPrice) * simSlope + simInterpolate;
                demand = demand >= 0 ? demand : 0;
            }
            else {
                demand = 10;
            }

            console.log("demand:", demand);

            let bodyFormData = new FormData();
            bodyFormData.set('demand', demand)

            let resp = await axios({
                method: 'post',
                url: API_URL + "stores/" + storeId + "/items/" + itemId + "/recalculate",
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            newPrice = parseFloat(resp.data);

        }
    }


    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error!</p>

    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col md={6}>
                        <ControlLabel>slope:</ControlLabel>
                        <FormControl
                            name="slope"
                            rows="1"
                            type="text"
                            defaultValue={simSlope}
                            onChange={(e) => setSimSlope(parseFloat(e.target.value))}
                        />
                        <ControlLabel>interpolate:</ControlLabel>
                        <FormControl
                            name="interpolate"
                            rows="1"
                            type="text"
                            defaultValue={simInterpolate}
                            onChange={(e) => setSimInterpolate(parseFloat(e.target.value))}
                        />
                        <Button onClick={() => generateSimulatedDemandParams()}>Generate Random</Button>
                        <br />
                        <ControlLabel>storeId:</ControlLabel>
                        <FormControl
                            name="storeId"
                            rows="1"
                            type="text"
                            defaultValue={0}
                            onChange={(e) => setStoreId(parseInt(e.target.value))}
                        />
                        <ControlLabel>itemId:</ControlLabel>
                        <FormControl
                            name="itemId"
                            rows="1"
                            type="text"
                            defaultValue={0}
                            onChange={(e) => setItemId(parseInt(e.target.value))}
                        />

                        slope= {simSlope} <br />
                        interpolate= {simInterpolate}
                        <CanvasJSChart options={
                            {
                                animationEnabled: true,
                                axisX: {
                                    tickLength: 10,
                                    title: "Price",
                                    // interval: xInterval
                                },
                                axisY: {
                                    title: "Demand",
                                    suffix: "",
                                    includeZero: false
                                },
                                toolTip: {
                                    shared: true
                                },
                                data:
                                    [
                                        {
                                            type: "line",
                                            name: "Simulated Demand",
                                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                                            markerType: "none",
                                            showInLegend: true,
                                            dataPoints: simData
                                        }
                                    ]
                            }
                        }
                        />
                        <Row>
                            <Col lg={4}>
                                <Button onClick={() => setXInterval(old => old - 10)}>Zoom In</Button>
                                <Button onClick={() => setXInterval(old => old + 10)}>Zoom Out</Button>
                            </Col>
                            <Col lg={4} />
                            <Col lg={2}>
                                <ControlLabel>iterations:</ControlLabel>
                                <FormControl
                                    name="iterations"
                                    rows="1"
                                    type="text"
                                    defaultValue={iterations}
                                    onChange={(e) => setIterations(parseInt(e.target.value))}
                                />
                            </Col>
                            <Col lg={2}>
                                <Button onClick={() => simulate()}>Simulate > </Button>
                            </Col>
                        </Row>




                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>

                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>


            </Grid>
        </div>
    );
}

export default Simulation;
