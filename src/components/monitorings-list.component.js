import React, { Component } from "react";
import MonitoringDataService from "../services/monitoring.service";
import { Link } from "react-router-dom";

export default class MonitoringsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchClassroom = this.onChangeSearchClassroom.bind(this);
        this.retrieveMonitorings = this.retrieveMonitorings.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMonitoring = this.setActiveMonitoring.bind(this);
        this.removeAllMonitorings = this.removeAllMonitorings.bind(this);
        this.searchClassroom = this.searchClassroom.bind(this);

        this.state = {
            monitorings: [],
            currentMonitoring: null,
            currentIndex: -1,
            searchClassroom: ""
        };
    }

    componentDidMount() {
        this.retrieveMonitorings();
    }

    onChangeSearchClassroom(e) {
        const searchClassroom = e.target.value;

        this.setState({
            searchClassroom: searchClassroom
        });
    }

    retrieveMonitorings() {
        MonitoringDataService.getAll()
            .then(response => {
                this.setState({
                    monitorings: response.data
                });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMonitorings();
        this.setState({
            currentMonitoring: null,
            currentIndex: -1
        });
    }

    setActiveMonitoring(monitoring, index) {
        this.setState({
            currentMonitoring: monitoring,
            currentIndex: index
        });
    }

    removeAllMonitorings() {
        MonitoringDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchClassroom() {
        MonitoringDataService.findByClassroom(this.state.searchClassroom)
            .then(response => {
                this.setState({
                    monitorings: response.data
                });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchClassroom, monitorings, currentMonitoring, currentIndex } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por identificacion"
                        value={searchClassroom}
                        onChange={this.onChangeSearchClassroom}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchClassroom}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Monitorias</h4>

                    <ul>
                        {monitorings &&
                            monitorings.map((monitoring, index) => (
                                <li
                                    className={
                                        "list-group-item" +
                                        (index === currentIndex ? "active" : "")}
                                        onClick={() => this.setActiveMonitoring(monitoring, index)}
                                        key={index}
                                >
                                    {monitoring.classroom}
                                </li>
                            ))}
                    </ul>

                    <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllMonitorings}
                    >
                        Eliminar TODO
                    </button>                        

                </div>
                <div className="col-md-6">
                    {currentMonitoring ? (
                        <div>
                            <h4>Monitorias</h4>
                            <div>
                                <label>
                                    <strong>Monitor asignado:</strong>
                                </label>{" "}
                                {currentMonitoring.monitor_assign}
                            </div>
                            <div>
                                <label>
                                    <strong>Materia:</strong>
                                </label>{" "}
                                {currentMonitoring.class}
                            </div>
                            <div>
                                <label>
                                    <strong>Fecha asignacion:</strong>
                                </label>{" "}
                                {currentMonitoring.date_assign}
                            </div>
                            <div>
                                <label>
                                    <strong>Salon de clases:</strong>
                                </label>{" "}
                                {currentMonitoring.classroom}
                            </div>
                            
                            <Link
                                to={"/monitorings/" + currentMonitoring.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Seleccione una monitoria...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}