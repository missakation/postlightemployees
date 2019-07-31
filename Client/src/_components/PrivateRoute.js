import React from "react";
import { Redirect } from "@reach/router";

import { authenticationService } from "../_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = authenticationService.currentUserValue;
  if (!currentUser) {
    return <Redirect noThrow to="/login" />;
  } else {
    return <Component {...rest} />;
  }
};
