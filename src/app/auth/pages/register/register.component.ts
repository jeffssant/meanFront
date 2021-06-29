import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  register(){
    console.log(this.miForm.value);
    console.log(this.miForm.valid);
  }


}
