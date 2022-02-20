import React from 'react';
import { withRouter } from "react-router-dom";

function Logout({setUser, history}) {
    setUser(null);
    history.replace("/login");
    return(<></>)
}
Logout.displayName = "Logout";
export default withRouter(Logout);