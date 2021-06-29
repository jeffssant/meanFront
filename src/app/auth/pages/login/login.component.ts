import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miForm: FormGroup = this.fb.group({
    email: ['teste@teste.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService ) { }

  login() {
    console.log(this.miForm.value);

    const {email, password} = this.miForm.value;

    this.authService.login(email, password)
    .subscribe(ok => {
      if(ok){
        this.router.navigateByUrl("/dashboard")
      }

      // Mostrar erro
    });



    //
  }

}
