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

  // postUser(user: User){
  //   debugger
  //   return this.http.post(environment.apiBaseUrl + '/register', user);
  //   // return this.http.post(environment.apiBaseUrl + '/register', user)
  //   //   .map(resdata => {
  //   //     return resdata;
  //   //   }, error => {
  //   //     return null;
  //   //   });
  // }
  // setHeaders() {
  //   return {  'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Access-Control-Allow-Headers': 'Content-Type', }
  // }

  
  postUser(user: User): Observable<any> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    const data = JSON.stringify(user);
    return this.http.post(environment.apiBaseUrl + '/register', data, requestOptions)
  }

  login(email:string, password:string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/login/' + email + '/'+ password)
  }

  getUserList():any {
    return this.http.get(environment.apiBaseUrl + '/get/home/')
  }

  update(id:number, user:User){
    const data = JSON.stringify(user);
    return this.http.put(environment.apiBaseUrl + '/put/' +id, data)
  }

  delete(id:number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + '/delete/' + id)
  }
}

