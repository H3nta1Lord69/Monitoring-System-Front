import React, { Component } from "react";
import MonitorDataService from "../services/monitor.service";

export default class AddMonitor extends Component {
    constructor(props) {
        super(props);
        // Create one function per value in the database
        this.onChangeName = this.onChangeName.bind(this);
        this.onChageLastname = this.onChageLastname.bind(this);
        this.onChangeCareer = this.onChangeCareer.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onChangePid = this.onChangePid.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveMonitor = this.saveMonitor.bind(this);
        this.newMonitor = this.newMonitor.bind(this);

        this.state = {
            id: null,
            name: "",
            lastname: "",
            career: "",
            semester: "",
            pid: "",
            phone: "",
            email: "",
            active: false,

            submitted: false
        };
    }

        onChangeName(e) {
            this.setState({
                name: e.target.value
            });
        }

        onChageLastname(e) {
            this.setState({
                lastname: e.target.value
            });
        }

        onChangeCareer(e) {
            this.setState({
                career: e.target.value
            });
        }

        onChangeSemester(e) {
            this.setState({
                semester: e.target.value
            });
        }

        onChangePid(e) {
            this.setState({
                pid: e.target.value
            });
        }

        onChangePhone(e) {
            this.setState({
                phone: e.target.value
            });
        }

        onChangeEmail(e) {
            this.setState({
                email: e.target.value
            });
        }

        saveMonitor() {
            var data = {
                name: this.state.name,
                lastname: this.state.lastname,
                career: this.state.career,
                semester: this.state.semester,
                pid: this.state.pid,
                phone: this.state.phone,
                email: this.state.email
            };

            MonitorDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        lastname: response.data.lastname,
                        career: response.data.career,
                        semester: response.data.semester,
                        pid: response.data.pid,
                        phone: response.data.phone,
                        email: response.data.email,
                        active: response.data.active,

                        submitted: true
                    });
                  console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        newMonitor() {
            this.setState({
                id: null,
                name: "",
                lastname: "",
                career: "",
                semester: "",
                pid: "",
                phone: "",
                email: "",
                active: false,

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
                        <button className="btn btn-success" onClick={this.newMonitor}>
                            Añadir
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                required
                                value={this.state.lastname}
                                onChange={this.onChageLastname}
                                name="lastname"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="career">Carrera</label>
                            <input
                                type="text"
                                className="form-control"
                                id="career"
                                required
                                value={this.state.career}
                                onChange={this.onChangeCareer}
                                name="career"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester">Semestre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="semester"
                                required
                                value={this.state.semester}
                                onChange={this.onChangeSemester}
                                name="semester"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pid">Identificacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pid"
                                required
                                value={this.state.pid}
                                onChange={this.onChangePid}
                                name="pid"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Telefono</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                required
                                value={this.state.phone}
                                onChange={this.onChangePhone}
                                name="phone"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <button onClick={this.saveMonitor} className="btn btn-success">
                            Enviar
                        </button>

                    </div>
                )}
            </div>
        );
    }   
}