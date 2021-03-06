import React, { Component } from "react";
import MonitoringDataService from "../services/monitoring.service";

export default class AddMonitoring extends Component {
    constructor(props) {
        super(props);
        // Create one function per value in the database
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChageMonitorAssign = this.onChageMonitorAssign.bind(this);
        this.onChangeDateAssign = this.onChangeDateAssign.bind(this);
        this.onChangeClassroom = this.onChangeClassroom.bind(this);
        this.saveMonitoring = this.saveMonitoring.bind(this);
        this.newMonitoring = this.newMonitoring.bind(this);

        this.state = {
            id: null,
            class: "",
            monitor_assign: "",
            date_assign: "",
            classroom: "",

            submitted: false
        };
    }

        onChangeClass(e) {
            this.setState({
                class: e.target.value
            });
        }

        onChageMonitorAssign(e) {
            this.setState({
                monitor_assign: e.target.value
            });
        }

        onChangeDateAssign(e) {
            this.setState({
                date_assign: e.target.value
            });
        }

        onChangeClassroom(e) {
            this.setState({
                classroom: e.target.value
            });
        }

        saveMonitoring() {
            var data = {
                class: this.state.class,
                monitor_assign: this.state.monitor_assign,
                date_assign: this.state.date_assign,
                classroom: this.state.classroom
            };

            MonitoringDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        class: response.data.class,
                        monitor_assign: response.data.monitor_assign,
                        date_assign: response.data.date_assign,
                        classroom: response.data.classroom,

                        submitted: true
                    });
                  console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        newMonitoring() {
            this.setState({
                id: null,
                class: "",
                monitor_assign: "",
                date_assign: "",
                classroom: "",
                
                submitted: false
            });
        }

    // Check the Submitted state, if it is `true` show an Add button. Otherwise display a Form
    render() {
        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4>Se ha enviado correctamente el registro!</h4>
                        <button className="btn btn-success" onClick={this.newMonitoring}>
                            Añadir
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Materia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="class"
                                required
                                value={this.state.class}
                                onChange={this.onChangeClass}
                                name="class"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Monitor asignado</label>
                            <input
                                type="text"
                                className="form-control"
                                id="monitor_assign"
                                required
                                value={this.state.monitor_assign}
                                onChange={this.onChageMonitorAssign}
                                name="monitor_assign"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="career">Fecha asignacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="date_assign"
                                value={this.state.date_assign}
                                onChange={this.onChangeDateAssign}
                                name="date_assign"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester">Salon de clases</label>
                            <input
                                type="text"
                                className="form-control"
                                id="classroom"
                                required
                                value={this.state.classroom}
                                onChange={this.onChangeClassroom}
                                name="classroom"
                            />
                        </div>

                        <button onClick={this.saveMonitoring} className="btn btn-success">
                            Enviar
                        </button>

                    </div>
                )}
            </div>
        );
    }   
}