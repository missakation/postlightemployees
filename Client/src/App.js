import React from 'react';
import Employees from './Employees/Employees'
import EmployeeDetails from './EmployeeDetails/EmployeeDetails'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import { Router, Link } from "@reach/router"
import './App.css';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function App() {

  return (

    <div className="App">
      <header className="App-header">
        <h6 className="header-title">
          Postlight Employees
        </h6>
      </header>
      <Router>
        <EmployeeDetails path="/">Dashboard</EmployeeDetails>
        <Employees path="/employees">Customers</Employees>
        <Login path="/login">Login</Login>
        <Register path="/register">Login</Register>
        <NotFound default />
      </Router>
    </div>
  )
}

export default App;



