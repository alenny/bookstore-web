import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';

const CURRENT_USER_KEY: string = "currentUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getCurrentUser(): User {
    let txt = localStorage.getItem(CURRENT_USER_KEY);
    return txt ? JSON.parse(txt) : null;
  }

  signin(userName: string, password: string): Observable<User> {
    if (userName !== 'dzy' || password !== 'dzy') {
      return throwError({ error: 'Bad credential' });
    }
    let user = { id: 1, name: 'dzy', jwtToken: 'dzy.dzy.dzy' };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return of(user);
  }

  signout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}
