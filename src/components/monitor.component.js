import React, { Component } from "react";
import MonitorDataService from "../services/monitor.service";

export default class Monitor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChageLastname = this.onChageLastname.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangePid = this.onChangePid.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getMonitor = this.getMonitor.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateMonitor = this.updateMonitor.bind(this);
    this.deleteMonitor = this.deleteMonitor.bind(this);

    this.state = {
      currentMonitor: {
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
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMonitor(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          name: name
        }
      };
    });
  }

  onChageLastname(e) {
    const lastname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          lastname: lastname
        }
      };
    });
  }

  onChangeCareer(e) {
    const career = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          career: career
        }
      };
    });
  }

  onChangeSemester(e) {
    const semester = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          semester: semester
        }
      };
    });
  }

  onChangePid(e) {
    const pid = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          pid: pid
        }
      };
    });
  }

  onChangePhone(e) {
    const phone = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          phone: phone
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitor: {
          ...prevState.currentMonitor,
          email: email
        }
      };
    });
  }

  getMonitor(id) {
    MonitorDataService.get(id)
      .then(response => {
        this.setState({
          currentMonitor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActive(status) {
    var data = {
        id: this.state.currentMonitor.id,
        name: this.state.currentMonitor.name,
        lastname: this.state.currentMonitor.lastname,
        career: this.state.currentMonitor.career,
        semester: this.state.currentMonitor.semester,
        pid: this.state.currentMonitor.pid,
        phone: this.state.currentMonitor.phone,
        email: this.state.currentMonitor.email,
        active: status,
    };

    MonitorDataService.update(this.state.currentMonitor.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMonitor: {
            ...prevState.currentMonitor,
            active: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMonitor() {
    MonitorDataService.update(
      this.state.currentMonitor.id,
      this.state.currentMonitor
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Monitor was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMonitor() {    
    MonitorDataService.delete(this.state.currentMonitor.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Monitors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMonitor } = this.state;

    return (
      <div>
        {currentMonitor ? (
          <div className="edit-form">
            <h4>Monitor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.lastname}
                  onChange={this.onChageLastname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Carrera</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.career}
                  onChange={this.onChangeCareer}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Semestre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.semester}
                  onChange={this.onChangeSemester}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Identificacion</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.pid}
                  onChange={this.onChangePid}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Correo</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMonitor.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentMonitor.active ? "Active" : "Pending"}
              </div>
            </form>

            {currentMonitor.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(false)}
              >
                Desactivar
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(true)}
              >
                Activar
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMonitor}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMonitor}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor seleccione un monitor...</p>
          </div>
        )}
      </div>
    );
  }
}
