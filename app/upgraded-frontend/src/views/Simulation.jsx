import React, { useState, useEffect } from "react";
import { Grid, Row, Col, FormControl, ControlLabel } from "react-bootstrap";

import useAxios from "axios-hooks"
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";

import Button from "components/CustomButton/CustomButton.jsx"

import CanvasJSReact from 'assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Simulation = (props) => {

    const [simSlope, setSimSlope] = useState(0);
    const [simInterpolate, setSimInterpolate] = useState(0);
    const [xInterval, setXInterval] = useState(10);
    const [simData, setSimData] = useState([]);

    const [storeId, setStoreId] = useState();
    const [itemId, setItemId] = useState();
    const [iterations, setIterations] = useState(100);

    const [{ data: newPrice, loading, error }, recalculate]
        = useAxios({
            url: API_URL + "stores/" + storeId + "/items/" + itemId + "/recalculate",
            method: "POST"
        },
            { manual: true }
        );

    const generateSimulatedDemandParams = () => {
        setSimSlope((Math.random() * 20) - 10);
        setSimInterpolate(Math.floor(Math.random() * 100) + 100);
    }

    useEffect(() => {
        // Clear out data points
        setSimData([]);

        // Get 10 sample data points on the demand line
        const temp = [];
        for (let i = -5; i < 5; i++) {
            temp.push({ x: i * xInterval, y: ((i * simSlope * xInterval) + simInterpolate) });
        }
        setSimData(temp);

    }, [xInterval, simSlope, simInterpolate]);

    const update = async () => {
        let demand = 10;

        for (let i = 0; i < 100; i++) {
            if (newPrice) demand = newPrice * simSlope + simInterpolate;
            await recalculate({
                data: {
                    demand: demand
                }
            })
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
                                <Button onClick={() => update()}>Simulate > </Button>
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
