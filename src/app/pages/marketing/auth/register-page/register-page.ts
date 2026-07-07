import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthValidators } from '../utils/auth-utils';

@Component({
  selector: 'register',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './register-page.html',
})
export default class RegisterPage {

  private fb = inject( FormBuilder );

  isLoading = signal( false );
  errorMessage = signal<string | null>( null );
  successMessage = signal<string | null>( null );

  registerForm = this.fb.nonNullable.group({
    tenant_name: [ '', [ Validators.required ] ],
    full_name: [ '', [ Validators.required] ],
    email: [ '', [Validators.required, AuthValidators.emailFormat() ] ],
    phone: [ '', [Validators.required, AuthValidators.phoneFormat() ] ],
    password: [ '', [ Validators.required, AuthValidators.strongPassword() ] ],
    confirmPassword: [ '', [ Validators.required ] ],
  }, {
    validators: AuthValidators.passwordsMatch
  });

  isFieldInvalid( fieldName: string ): boolean {
    const control = this.registerForm.get( fieldName );
    return !!( control && control.invalid && ( control?.touched || control?.dirty ) );
  };
};
