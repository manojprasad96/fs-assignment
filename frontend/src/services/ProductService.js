import axios from "axios";
import authHeader from "./auth-header";
const http =  axios.create({
  baseURL: "http://localhost:8080/fs/api",
  headers: {
    "Content-type": "application/json"
  }
});

class ProductService {
    getAllValid() {
        return http.get("/products/valid", { headers: authHeader() });
    }
    getValidByTypeAndMFD(type, time, timeOp) {
        let url = "/products/valid/search?";
        url += type !== null ? `type=${encodeURIComponent(type)}&mfd=${time}&mfd_op=${timeOp}` : `mfd=${time}&mfd_op=${timeOp}`;
        return http.get(url, { headers: authHeader() });
    }
    getAllExpired() {
        return http.get("/products/expired", { headers: authHeader() });
    }
    getExpiredByTypeAndMFD(type, time, timeOp) {
        let url = "/products/expired/search?";
        url += type !== null ? `type=${encodeURIComponent(type)}&mfd=${time}&mfd_op=${timeOp}` : `mfd=${time}&mfd_op=${timeOp}`;
        return http.get(url, { headers: authHeader() });
    }

    getProductTypes() {
      return http.get("/products/types", { headers: authHeader() });
    }
    get(id) {
      return http.get(`/products/${id}`, { headers: authHeader() });
    }
    create(data) {
      return http.post("/products", data, { headers: authHeader() });
    }
    update(id, data) {
      return http.put(`/products/${id}`, data, { headers: authHeader() });
    }
    delete(id) {
      return http.delete(`/products/${id}`, { headers: authHeader() });
    }
    deleteAll() {
      return http.delete(`/products`, { headers: authHeader() });
    }
    findById(id) {
      return http.get(`/products/${id}`, { headers: authHeader() });
    }
  }
  export default new ProductService();