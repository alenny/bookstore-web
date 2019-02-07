import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { AuthRequest } from '../models/auth.request';
import { RegisterRequest } from '../models/register.request';

const CURRENT_USER_KEY: string = "currentUser";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = environment.authApiEndpoint + '/api/authentication';

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): User {
    let txt = localStorage.getItem(CURRENT_USER_KEY);
    return txt ? JSON.parse(txt) : null;
  }

  signin(userName: string, password: string): Observable<User> {
    let req = new AuthRequest();
    req.userName = userName;
    req.password = password;
    return this.http.post<User>(this.authUrl, req, httpOptions)
      .pipe(
        tap(u => {
          if (u) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
          }
        })
      )
  }

  signout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  register(userName: string, password: string): Observable<User> {
    let req = new RegisterRequest();
    req.userName = userName;
    req.password = password;
    return this.http.post<User>(`${this.authUrl}/register`, req, httpOptions)
      .pipe(
        tap(u => {
          if (u) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
          }
        })
      )
  }
}
