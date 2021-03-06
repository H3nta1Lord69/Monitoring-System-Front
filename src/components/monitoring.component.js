import React, { Component } from "react";
import MonitoringDataService from "../services/monitoring.service";

export default class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeMonitoringAssign = this.onChangeMonitoringAssign.bind(this);
    this.onChangeDateAssign = this.onChangeDateAssign.bind(this);
    this.onChangeClassroom = this.onChangeClassroom.bind(this);
    this.getMonitoring = this.getMonitoring.bind(this);
    this.updateMonitoring = this.updateMonitoring.bind(this);
    this.deleteMonitoring = this.deleteMonitoring.bind(this);

    this.state = {
      currentMonitoring: {
        id: null,
        class: "",
        monitor_assign: "",
        date_assign: "",
        classroom: "",

        submitted: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMonitoring(this.props.match.params.id);
  }

  onChangeClass(e) {
    const classs = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitoring: {
          ...prevState.currentMonitoring,
          classs: classs
        }
      };
    });
  }

  onChangeMonitoringAssign(e) {
    const monitor_assign = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitoring: {
          ...prevState.currentMonitoring,
          monitor_assign: monitor_assign
        }
      };
    });
  }

  onChangeDateAssign(e) {
    const date_assign = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitoring: {
          ...prevState.currentMonitoring,
          date_assign: date_assign
        }
      };
    });
  }

  onChangeClassroom(e) {
    const classroom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMonitoring: {
          ...prevState.currentMonitoring,
          classroom: classroom
        }
      };
    });
  }

  getMonitoring(id) {
    MonitoringDataService.get(id)
      .then(response => {
        this.setState({
          currentMonitoring: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMonitoring() {
    MonitoringDataService.update(
      this.state.currentMonitoring.id,
      this.state.currentMonitoring
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Monitoring was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMonitoring() {    
    MonitoringDataService.delete(this.state.currentMonitoring.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Monitorings')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMonitoring } = this.state;

    return (
      <div>
        {currentMonitoring ? (
          <div className="edit-form">
            <h4>Monitoring</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Materia</label>
                <input
                  type="text"
                  className="form-control"
                  id="class"
                  value={currentMonitoring.class}
                  onChange={this.onChangeClass}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Monitor asignado</label>
                <input
                  type="text"
                  className="form-control"
                  id="monitor_assign"
                  value={currentMonitoring.monitor_assign}
                  onChange={this.onChangeMonitoringAssign}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Fecha asignacion</label>
                <input
                  type="text"
                  className="form-control"
                  id="date_assign"
                  value={currentMonitoring.date_assign}
                  onChange={this.onChangeDateAssign}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Salon de clases</label>
                <input
                  type="text"
                  className="form-control"
                  id="classroom"
                  value={currentMonitoring.classroom}
                  onChange={this.onChangeClassroom}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMonitoring}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMonitoring}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor seleccione una monitoria...</p>
          </div>
        )}
      </div>
    );
  }
}
