import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthResponse, User } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.BaseUrl;
  private _user!: User;

  get User(){
    return {...this._user}
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => {
        localStorage.setItem('tokenNG', resp.token!);
        if(resp.ok){
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  tokenValid(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('tokenNG') || '');

    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map(resp=> {

        localStorage.setItem('tokenNG', resp.token!);
        if(resp.ok){
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }

       return resp.ok
      }),
      catchError(err => of(false))
    )
  }


  registrer(name:string, email:string, password:string,) {

    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => {
        localStorage.setItem('tokenNG', resp.token!);
        if(resp.ok){
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )

  }
}
