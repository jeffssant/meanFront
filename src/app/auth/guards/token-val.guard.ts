import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenValGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.tokenValid()
    .pipe(
      tap(
      valid=> {
        if(!valid){
          this.router.navigateByUrl('/auth')
        }
      }
    ));
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.tokenValid().pipe(
      tap(
      valid=> {
        if(!valid){
          this.router.navigateByUrl('/auth')
        }
      }
    ));
  }
}
