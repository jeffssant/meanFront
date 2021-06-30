import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  miForm: FormGroup = this.fb.group({
    name: ['Jeff Sant', Validators.required],
    email: ['teste1@teste.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  register(){
    const {name, email, password} = this.miForm.value;

    this.authService.registrer(name, email, password)
    .subscribe(ok => {

      if(ok === true){
        this.router.navigateByUrl("/dashboard");
        return;
      }

      Swal.fire('Error', ok, 'error')
    });


  }


}
