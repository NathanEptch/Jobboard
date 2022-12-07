import http from "../common/http-common";

class AdvertisementDataService {
    getAll() {
        return http.get("/advertisements");
    }
    get(id) {
        return http.get(`/advertisements/${id}`);
    }

    GetAd(id) {
        return http.get(`/mod/${id}`);
    }
    create(data) {
        console.log(data);
        return http.post("/advertisements", data);
    }

    update(id, data) {
        return http.put(`/advertisements/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/advertisements/delete/${id}`);
    }

    deleteAll() {
        return http.delete(`/advertisements/`);
    }

    findByTitle(title) {
        return http.get(`/advertisement?title=${title}`);
    }
    createApp(data){
        return http.post('/applications', data)
    }
    getApMod(id){
        return http.get(`/applications/mod/${id}`);
    }
    getApUser(id){
        return http.get(`/applications/user/${id}`);
    }
    getApAll(){
        return http.get(`/applications`);
    };
    getUserAll(){
        return http.get('users');
    }

}

export default new AdvertisementDataService();