import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';


const API_URL = "http://localhost:8080/authenticate";
const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type','application/json')
    .set('skip-interceptor','true')
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

 async authenticateUser(credentials: any): Promise<any> {
    return this.httpClient.post(API_URL,
          {
            username: credentials.username,
            password: credentials.password
          }, httpOptions)
          .toPromise();
  }
}
