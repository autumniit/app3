import React, { Fragment } from "react";

import { useAuth0 } from "../react-auth0-spa";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

const Blank = () => {

    let {id} = useParams();

    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading Dashboard...</div>;
    }

    return (
        <Fragment>
            This is a blank template page.
            ID: {id}

            {/* TODO: 
                - Total sales graph
                - Sales log (item_id, time, pricepoint)
                - item list and modal for add/edit
                    - in depth of an item (possible pricepoints, a demand/price graph (resembles the one from the paper), a sales graph ))
                    - An update button for manual loop update using existing data
            -  */}
        </Fragment>
    );
};

export default Blank;