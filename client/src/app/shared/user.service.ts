import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: "",
    email: "",
    password: ""
  };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    debugger
    return this.http.post(environment.apiBaseUrl + '/register', user);
    // return this.http.post(environment.apiBaseUrl + '/register', user)
    //   .map(resdata => {
    //     return resdata;
    //   }, error => {
    //     return null;
    //   });
  }
  // setHeaders() {
  //   return { 'content-type': 'application/json' }
  // }
  // postUser(user: User): Observable<any> {
  //   return this.http.post(environment.apiBaseUrl + '/register', user, { 'headers': this.setHeaders() })
  // }
}

