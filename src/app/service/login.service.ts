import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login.model';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://dev.sitemercado.com.br/api/login';


    login(login: Login) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Basic ' + btoa(login.username + ':' + login.password)
            })
        };

        return this.http.post<any>(this.baseUrl, login, httpOptions);
    }
}
