import React from 'react';
import Welcome from './Employees/Employees'
import EmployeeDetails from './EmployeeDetails/EmployeeDetails'
import Login from './Login'
import Register from './Register'
import { Router, Link } from "@reach/router"
import './App.css';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
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
        <Welcome path="/customers">Customers</Welcome>
        <Login path="/login">Login</Login>
        <Register path="/register">Login</Register>
      </Router>
    </div>
  )
}

export default App;



