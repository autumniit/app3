import React, { Component } from "react";

import CanvasJSReact from 'assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ThompsonVisualizationGraphCard = (props) => {

    var plain = false;
    var hCenter = false;
    return (
        <div className={"card" + (plain ? " card-plain" : "")}>
            <div className={"header" + (hCenter ? " text-center" : "")}>
                <h4 className="title">Thompson Sampling Visualization</h4>
                <p className="category">Description</p>
            </div>
            <div
                className={"content"}
            >

                <div className="ct-chart">
                    {props.graphParams ?
                        <CanvasJSChart options={
                            {
                                animationEnabled: true,
                                axisX: {
                                    tickLength: 10
                                },
                                axisY: {
                                    title: "Units Sold",
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
                                            name: "Mean",
                                            toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y}",
                                            markerType: "none",
                                            showInLegend: true,
                                            dataPoints:
                                                props.graphParams.map(
                                                    obj => ({ y: obj.mean, x: obj.price_point })
                                                )
                                        },
                                        {
                                            type: "error",
                                            name: "CI95",
                                            showInLegend: true,
                                            toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]}",
                                            dataPoints:
                                                props.graphParams.map(
                                                    obj => ({ y: [obj.a, obj.b], x: obj.price_point })
                                                )

                                        }
                                    ]
                            }
                        }
                        />
                        :
                        null
                    }

                </div>


                <div className="footer">
                    <div className="stats">
                        {props.refreshButton}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThompsonVisualizationGraphCard;
