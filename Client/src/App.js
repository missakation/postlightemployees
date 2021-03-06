import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Employees from "./Employees/Employees";
import EmployeeDetails from "./EmployeeDetails/EmployeeDetails";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { Router, Link, navigate, Redirect } from "@reach/router";

import { authenticationService } from "./_services";
import { PrivateRoute } from "./_components/PrivateRoute";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = React.useState("");

  function logout() {
    authenticationService.logout();
    navigate("/login");
  }
  function goHome() {
    navigate("/employees");
  }

  useEffect(() => {
    authenticationService.currentUser.subscribe(user => {
      setCurrentUser(user);
    });
  }, "");

  return (
    <div className="App">
      {currentUser && (
        <header className="app-header">
          <h6 className="header-title">Postlight Employees</h6>
          <div>
            <a onClick={goHome}>Home</a>
            <a onClick={logout}>Logout</a>
          </div>
        </header>
      )}

      <Router>
        <PrivateRoute path="/" component={Employees} />
        <PrivateRoute path="/employees" component={Employees} />
        <PrivateRoute path="/employees/create" component={EmployeeDetails} />
        <PrivateRoute
          path="/employees/:employeeId"
          component={EmployeeDetails}
        />
        <Login path="/login">Login</Login>
        <Register path="/register">Login</Register>
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
