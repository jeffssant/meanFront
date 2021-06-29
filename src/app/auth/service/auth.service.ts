import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

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
        if(resp.ok){
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(false))
    )
  }
}
