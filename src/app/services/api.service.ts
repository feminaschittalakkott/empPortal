import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // base_url = "http://localhost:3000";
  base_url = "https://empserver-l9cz.onrender.com";

  constructor(private http: HttpClient) { }

  userLogin() {
    return this.http.get(`${this.base_url}/users/1`)
  }

  addEmployee(data: any) {
    return this.http.post(`${this.base_url}/employees`, data)
  }

  getEmployees() {
    return this.http.get(`${this.base_url}/employees`)
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${this.base_url}/employees/${id}`)
  }

  editEmployee(id: any, data: any) {
    return this.http.put(`${this.base_url}/employees/${id}`, data)
  }

  getEmp(id: any) {
    return this.http.get(`${this.base_url}/employees/${id}`)
  }

  getAdmin() {
    return this.http.get(`${this.base_url}/users/1`)
  }

  updateAdmin(data: any) {
    return this.http.put(`${this.base_url}/users/1`, data)
  }

}
