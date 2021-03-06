import React, { Component } from "react";
import MonitorDataService from "../services/monitor.service";
import { Link } from "react-router-dom";

export default class MonitorsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchPid = this.onChangeSearchPid.bind(this);
        this.retrieveMonitors = this.retrieveMonitors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMonitor = this.setActiveMonitor.bind(this);
        this.removeAllMonitors = this.removeAllMonitors.bind(this);
        this.searchPid = this.searchPid.bind(this);

        this.state = {
            monitors: [],
            currentMonitor: null,
            currentIndex: -1,
            searchPid: ""
        };
    }

    componentDidMount() {
        this.retrieveMonitors();
    }

    onChangeSearchPid(e) {
        const searchPid = e.target.value;

        this.setState({
            searchPid: searchPid
        });
    }

    retrieveMonitors() {
        MonitorDataService.getAll()
            .then(response => {
                this.setState({
                    monitors: response.data
                });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMonitors();
        this.setState({
            currentMonitor: null,
            currentIndex: -1
        });
    }

    setActiveMonitor(monitor, index) {
        this.setState({
            currentMonitor: monitor,
            currentIndex: index
        });
    }

    removeAllMonitors() {
        MonitorDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchPid() {
        MonitorDataService.findByPid(this.state.searchPid)
            .then(response => {
                this.setState({
                    monitors: response.data
                });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchPid, monitors, currentMonitor, currentIndex } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por identificacion"
                        value={searchPid}
                        onChange={this.onChangeSearchPid}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchPid}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Monitores</h4>

                    <ul>
                        {monitors &&
                            monitors.map((monitor, index) => (
                                <li
                                    className={
                                        "list-group-item" +
                                        (index === currentIndex ? "active" : "")}
                                        onClick={() => this.setActiveMonitor(monitor, index)}
                                        key={index}
                                >
                                    {monitor.pid}
                                </li>
                            ))}
                    </ul>

                    <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllMonitors}
                    >
                        Eliminar TODO
                    </button>                        

                </div>
                <div className="col-md-6">
                    {currentMonitor ? (
                        <div>
                            <h4>Monitor</h4>
                            <div>
                                <label>
                                    <strong>Identificacion:</strong>
                                </label>{" "}
                                {currentMonitor.pid}
                            </div>
                            <div>
                                <label>
                                    <strong>Nombre:</strong>
                                </label>{" "}
                                {currentMonitor.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Apellido:</strong>
                                </label>{" "}
                                {currentMonitor.lastname}
                            </div>
                            <div>
                                <label>
                                    <strong>Carrera:</strong>
                                </label>{" "}
                                {currentMonitor.career}
                            </div>
                            <div>
                                <label>
                                    <strong>Semestre:</strong>
                                </label>{" "}
                                {currentMonitor.semester}
                            </div>
                            <div>
                                <label>
                                    <strong>Telefono:</strong>
                                </label>{" "}
                                {currentMonitor.phone}
                            </div>
                            <div>
                                <label>
                                    <strong>Correo:</strong>
                                </label>{" "}
                                {currentMonitor.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Estado:</strong>
                                </label>{" "}
                                {currentMonitor.active ? "Activado" : "Pendiente"}
                            </div>
            
                            <Link
                                to={"/monitors/" + currentMonitor.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Seleccione un monitor...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}