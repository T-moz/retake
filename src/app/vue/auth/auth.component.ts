import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';




@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  // we use form control to have dynamic inputs
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minLength') ? 'Your password must be at leat 8 charatcers' :
        '';
  }


  // we call the auth service to do sign actions
  signUp() {
    this.authService.createNewUser(this.email.value, this.password.value);
  }
  signIn() {
    this.authService.signInUser(this.email.value, this.password.value);
  }
}
