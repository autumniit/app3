import React, { Component, useEffect, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { CopyBlock, CodeBlock, ocean } from 'react-code-blocks'

import { Card } from "components/Card/Card.jsx";

const UnityConnect = () => {

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              content={
                <div>
                  <div className="typo-line">
                    <h2>
                      Connect to Unity <br />
                      <small>Follow these simple steps to have your own dynamic pricing system integrated into your game.</small>
                    </h2>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 1:</span>
                      Create a store. Here you can specify its name and description.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 2:</span>
                      In Manage, click <i className="pe-7s-plus" /> to create a new store. Set its name and description.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 3:</span>
                      Click <i className="pe-7s-note" /> to get to Store Manage. Create an item. Specify its name.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 4:</span>
                      Click on <i className="pe-7s-angle-right-circle" /> to view all price points associated with the item. (There will be none, as the item has just been created)
                    </p>
                  </div>

                  <div className="typo-line">
                    <p>
                      <span className="category">Step 5:</span>
                      Create possible price points for your item for the model to explore.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 6:</span>
                      Note down StoreID and ItemID of the item, they will be required in later steps.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 7:</span>
                      In your Unity Project, create a new object. In this example, we will name it “DP Integrator”.
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 8:</span>
                      Add the following C# scripts to the object. The script’s name is irrelevant (in this example: DPAppIntegratorScript.cs)
                    </p>
                  </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <CopyBlock
                          text={`//DPAppIntegratorScript.cs

using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using System;

public class DPAppIntegrator : MonoBehaviour
{
    private const string apiUrlTemplate = "http://localhost:8000/api/stores/{0}/items/{1}/recalculate";

    public void ModelUpdate(int storeId, int itemId, int demand, Action<string> callback)
    {
        StartCoroutine(SendRecalculateRequest(storeId, itemId, demand, callback));
    }

    IEnumerator SendRecalculateRequest(int storeId, int itemId, int demand, Action<string> callback)
    {
        WWWForm form = new WWWForm();

        //Add form data here
        form.AddField("demand", demand);

        string apiUrl = string.Format(apiUrlTemplate, storeId, itemId);

        using (UnityWebRequest www = UnityWebRequest.Post(apiUrl, form))
        {
            yield return www.SendWebRequest();

            if (www.isNetworkError || www.isHttpError)
            {
                Debug.Log(www.error);
                //callback(null);
                callback("error");
            }
            else
            {
                Debug.Log("SendPost() complete!");
                callback(www.downloadHandler.text);
                //callback("updated text");
            }
        }
    }

    // API for each purchase (sales log)
}`}
                          language="csharp"
                          showLineNumbers={true}
                          theme={ocean}
                          wrapLines
                        />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>


                  <div className="typo-line">
                    <p>
                      <span className="category">Step 9:</span>
                      Everything is now ready. You can start using the functions available in the script. Here are brief explanations of what each functions do to get you started:
                    </p>
                  </div>
                  <div className="typo-line">
                    <p>
                      <span className="category">Step 10:</span>
                      An example of a an item in a store that updates its price every 10 seconds can be found here:
                    </p>
                  </div>

                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}


export default UnityConnect;
