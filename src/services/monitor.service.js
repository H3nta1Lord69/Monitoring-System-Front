import http from "../http-common";

class MonitorDataService {
    getAll() {
        return http.get("/monitors");
    }

    get(pid) {
        return http.get(`/monitors/${pid}`);
    }

    create(data) {
        return http.post("/monitors", data);
    }

    update(id, data) {
        return http.put(`/monitors/${id}`, data);
    }

    delete(id) {
        return http.delete(`/monitors/${id}`);
    }

    deleteAll() {
        return http.delete("/monitors");
    }

    findByPid(pid) {
        return http.get(`/monitors?pid=${pid}`);
    }
}

export default new MonitorDataService();