import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "../LoginPage";

const UnauthenticatedApp = () => {
  return (
    <div>
      <Switch>
        <Route>
          <LoginPage /> 
        </Route>
      </Switch>
    </div>
  );
};

export default UnauthenticatedApp;
