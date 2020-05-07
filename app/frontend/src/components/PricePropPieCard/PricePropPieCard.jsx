import React, { Component } from "react";

import CanvasJSReact from 'assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PricePropPieCard = (props) => {

    var plain = false;
    var hCenter = false;

    // if(props.loading) return <p>Loading...</p>
    // if(props.error) return <p>Error!</p>

    return (
        <div className={"card" + (plain ? " card-plain" : "")}>
            <div className={"header" + (hCenter ? " text-center" : "")}>
                <h4 className="title">Sold Price Proportion</h4>
                <p className="category">Proportion of each price point suggested by the application since the beginning</p>
            </div>
            <div
                className={"content"}
            >

                <div className="ct-chart">
                    {props.graphParams ?
                        <CanvasJSChart options={
                            {
                                animationEnabled: true,
                                subtitles: [{
                                    text: props.graphParams.length > 0 ? "Top sold at: " + props.graphParams[0].price_point : "No Sales Log Found",
                                    verticalAlign: "center",
                                    fontSize: 20,
                                    dockInsidePlotArea: true
                                }],
                                data: [{
                                    type: "doughnut",
                                    showInLegend: true,
                                    indexLabel: "{name}: {y}",
                                    // yValueFormatString: "#,###'%'",
                                    dataPoints:
                                        props.graphParams.map(
                                            obj => ({ name: String(obj.price_point), y: obj.count })
                                        )
                                }]

                            }
                        }
                        />
                        :
                        null
                    }

                </div>

                {props.graphParams ?
                    <div className="footer">
                        <div className="stats">
                            <i className="pe-7s-refresh-2" onClick={() => props.getGraphParamsWrapper()} /> Last refreshed: {props.lastRefreshedTime}
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

export default PricePropPieCard;
