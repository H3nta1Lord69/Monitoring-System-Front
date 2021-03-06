import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddMonitor from "./components/add-monitor.component";
import MonitorsList from "./components/monitors-list.component";
import Monitor from "./components/monitor.component";
import MonitoringsList from "./components/monitorings-list.component";
import AddMonitoring from "./components/add-monitoring.component";
import Monitoring from "./components/monitoring.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/monitors" className="navbar-brand">
            Monitoring App
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/monitors"} className="nav-link">
                Monitors
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/monitorings"} className="nav-link">
                Monitorias
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/m/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/monitors"]} component={MonitorsList} />
            <Route exact path={["/add"]} component={AddMonitor} />
            <Route path={["/monitors/:id"]} component={Monitor} />
            <Route exact path={["/", "/monitorings"]} component={MonitoringsList} />
            <Route exact path={["/m/add"]} component={AddMonitoring} />
            <Route path={["/monitorings/:id"]} component={Monitoring} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;