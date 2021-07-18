import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

const API_URL: string = "http://localhost:8080/hello";

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(private httpClient: HttpClient) { }

  sayHello(): Observable<any>{
    return this.httpClient.get(API_URL,{responseType: 'text'}).pipe(
      catchError((err) => {
        console.log("error caught in service");
        console.error(err);
        return throwError(err);
      })
    );
  }
}
