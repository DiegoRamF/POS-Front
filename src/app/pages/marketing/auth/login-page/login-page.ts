import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'login',
  imports: [ RouterLink,  ],
  templateUrl: './login-page.html',
})
export default class LoginPage {}
