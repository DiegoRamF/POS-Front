import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { AuthValidators } from '../utils/auth-utils';

@Component({
  selector: 'register',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './register-page.html',
})
export default class RegisterPage {

  private fb = inject( FormBuilder );
  private router = inject( Router );

  isLoading = signal( false );
  errorMessage = signal<string | null>( null );
  successMessage = signal<string | null>( null );
  showPassword = signal( false );

  registerForm = this.fb.nonNullable.group({
    tenant_name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    full_name: [ '', [ Validators.required, AuthValidators.nameFormat() ] ],
    email: [ '', [ Validators.required, AuthValidators.emailFormat() ] ],
    phone: [ '', [ Validators.required, AuthValidators.phoneFormat() ] ],
    password: [ '', [ Validators.required, AuthValidators.strongPassword() ] ],
    confirmPassword: [ '', [ Validators.required ] ],
  }, {
    validators: AuthValidators.passwordsMatch
  });



  togglePasswordVisibility(): void {
    this.showPassword.update( value => !value);
  };



  isFieldInvalid( fieldName: string ): boolean {
    const control = this.registerForm.get( fieldName );
    return !!( control && control.invalid && ( control?.touched || control?.dirty ) );
  };



  async onSubmit() {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    };

    this.isLoading.set( true );
    this.errorMessage.set( null );

    const { confirmPassword, ...registerData } = this.registerForm.getRawValue();

    console.log( 'Datos para enviar: ', registerData );

    try {
      await new Promise( ( resolve ) => setTimeout( resolve, 2000) )

      this.isLoading.set( false );

      this.router.navigate([ 'auth/login' ]);
    } catch (error) {
      this.isLoading.set( false );
      this.errorMessage.set( 'Ocurrio un error' )
    }
  };



  async onGoogleLogin() {
    this.isLoading.set( true );
    this.errorMessage.set( null );

    try {

    } catch (error: any) {
      this.isLoading.set( false );
      this.errorMessage.set( error.message || 'Error al conectar con Google' );
    };
  };

};
