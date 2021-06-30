import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
    *{
      margin: 15px;
    }
    `
  ]
})
export class DashboardComponent {

  get User() {
    return this.authService.User;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  logout() {
    localStorage.removeItem('tokenNG')
    this.router.navigateByUrl('/auth');
  }

}
