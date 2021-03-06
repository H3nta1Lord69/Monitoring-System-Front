import http from "../http-common";

class MonitoringDataService {
    getAll() {
        return http.get("/monitorings");
    }

    get(classroom) {
        return http.get(`/monitorings/${classroom}`);
    }

    create(data) {
        return http.post("/monitorings", data);
    }

    update(id, data) {
        return http.put(`/monitorings/${id}`, data);
    }

    delete(id) {
        return http.delete(`/monitorings/${id}`);
    }

    deleteAll() {
        return http.delete("/monitorings");
    }

    findByClassroom(classroom) {
        return http.get(`/monitorings?classroom=${classroom}`);
    }
}

export default new MonitoringDataService();