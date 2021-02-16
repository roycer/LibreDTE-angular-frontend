import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Servidores} from './servidores';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private data: BehaviorSubject<User[]>;
  private url = '/login';
  
  constructor(private _router: Router, private http: HttpClient, private servidores: Servidores) {
    this.url = this.servidores.SERV_SII + this.url;
    this.data = new BehaviorSubject<User[]>([]);
  }

  login(username: string, password: string) {

      return this.http.post(this.url, {username: username, password: password})
      .pipe(
        map( user => {
          if (user) {
            localStorage.setItem('_user', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('_user');
    this._router.navigate(['/login']);
  }

  
}
