import React, { } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Card } from "components/Card/Card.jsx";

import step1 from "assets/img/steps/step1.png"
import step2 from "assets/img/steps/step2.png"
import step3 from "assets/img/steps/step3.png"
import step4 from "assets/img/steps/step4.png"
import step6 from "assets/img/steps/step6.png"
import step9 from "assets/img/steps/step9.png"

const UnityConnect = () => {

  var step6code =
    `//DPAppIntegratorScript.cs

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

}`



  var step8code =
    `//DPAppIntegratorScript.cs
...
    public void ModelUpdate(int storeId, int itemId, int demand, Action<string> callback)
    {
        StartCoroutine(SendRecalculateRequest(storeId, itemId, demand, callback));
    }
...`

  var step9code =
    `// EventScript.cs

using UnityEngine;
using UnityEngine.UI;

public class EventScript : MonoBehaviour
{
    public GameObject item;
    private Button buyButton;
    private int storeId;
    private int itemId;


    public Text timeText;
    public Text priceText;

    public GameObject itegrator;

    private int boughtDuring = 0;

    public float intervalSize = 10.0f;
    private float timeLeft;

    // Start is called before the first frame update
    void Start()
    {
        buyButton = item.transform.Find("Button").GetComponent<Button>();
        buyButton.onClick.AddListener(TaskOnClick);

        timeLeft = intervalSize;

        SetItemAttributes();
        itegrator.GetComponent<DPAppIntegrator>().ModelUpdate(storeId, itemId, boughtDuring, UpdateText);
    }

    void SetItemAttributes()
    {
        storeId = item.GetComponent<ItemAttributes>().storeId;
        itemId = item.GetComponent<ItemAttributes>().itemId;
    }

    void OnTimerEnd()
    {
        itegrator.GetComponent<DPAppIntegrator>().ModelUpdate(storeId, itemId, boughtDuring, UpdateText);
        boughtDuring = 0;
    }

    void UpdateText(string str)
    {
        priceText.GetComponent<Text>().text = str;
    }

    void TaskOnClick()
    {
        boughtDuring++;
        Debug.Log("Total bought:" + boughtDuring);
    }

    void Update()
    {
        timeLeft -= Time.deltaTime;
        if (timeLeft <= 0)
        {
            timeLeft = intervalSize;
            OnTimerEnd();
        }
        timeText.GetComponent<Text>().text = timeLeft.ToString("0.##");
    }
}`

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              content={

                <div>
                  <Row><Col lg={10}>
                    <div className="typo-line">
                      <h2>
                        Connect to Unity <br />
                        <small>Follow these simple steps to have your own dynamic pricing system integrated into your game.</small>
                      </h2>
                    </div>
                    <div className="typo-line">
                      <p>
                        <span className="category">Step 1:</span>
                      In Manage, click <i>+ Add New Store</i> to create a new store. Set its name and description.
                    </p>
                    </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step1} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                    <div className="typo-line">
                      <p>
                        <span className="category">Step 2:</span>
                      Click <i className="pe-7s-note" /> to get to Store Manage. Create an item. Specify its name.
                    </p>
                    </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step2} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                    <div className="typo-line">
                      <p>
                        <span className="category">Step 3:</span>
                      Click on <i className="pe-7s-angle-right-circle" /> to view all price points associated with the item. (There will be none, as the item has just been created)
                    </p>
                    </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step3} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                    <div className="typo-line">
                      <p>
                        <span className="category">Step 4:</span>
                      Create possible price points for your item for the model to explore.
                    </p>
                    </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step4} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                    <div className="typo-line">
                      <p>
                        <span className="category">Step 5:</span>
                      Note down StoreID and ItemID of the item, they will be required in later steps.
                    </p>
                    </div>
                    <div className="typo-line">
                      <p>
                        <span className="category">Step 6:</span>
                      In your Unity Project, create a new object. In this example, we will name it “DPAppIntegrator”.
                    </p>
                    </div>

                    <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step6} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                    <div className="typo-line">
                      <p>
                        <span className="category">Step 7:</span>
                      Add the following C# script to the object. The script’s name is irrelevant (in this example: DPAppIntegratorScript.cs)
                    </p>
                    </div>

                  </Col>
                  </Row>


                  <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                      <SyntaxHighlighter
                        language="cs"
                        style={okaidia}
                        showLineNumbers
                      >
                        {step6code}
                      </SyntaxHighlighter>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>

                  <Row>
                    <Col lg={10}>
                      <div className="typo-line" />

                      <div className="typo-line">
                        <p>
                          <span className="category">Step 8:</span>
                      Everything is now ready. You can start using the functions available in the script. Here are brief explanations of what each function does to get you started:
                    </p>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                      <SyntaxHighlighter
                        language="cs"
                        style={okaidia}
                        showLineNumbers
                        startingLineNumber={10}>
                        {step8code}
                      </SyntaxHighlighter>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>

                  <Row>
                    <Col lg={10}>
                      <div className="typo-line">
                        <p>
                          <b>ModelUpdate</b> is a public function that can be called to send a new request to the application's backend. The function returns a new optimal price point, given the data sent with the request. <br />
                          <b>Arguments:</b> <i>storeId, itemId,</i> the accumulated <i>demand</i> (purchases) are required. Optionally, a <i>callback</i> function can also be passed for price label updates, or other uses.
                        </p>
                      </div>
                      <div className="typo-line">
                        <p>
                          <span className="category">Step 9:</span>
                      An example of a an item in a store that updates its price every 10 seconds can be found here:
                    </p>
                      </div>
                    </Col>
                  </Row>
                  
                  <Row>
                      <Col lg={1}></Col>
                      <Col lg={10}>
                        <img src={step9} height="720" width="1080" />
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <div className="typo-line" />

                  <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                      <SyntaxHighlighter language="cs" style={okaidia} showLineNumbers>
                        {step9code}
                      </SyntaxHighlighter>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>
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
