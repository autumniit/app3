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
        </Fragment>
    );
};

export default Blank;