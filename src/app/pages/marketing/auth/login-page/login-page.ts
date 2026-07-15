import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthValidators } from '../utils/auth-utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './login-page.html',
})
export default class LoginPage {

  private authService = inject( AuthService );
  private fb = inject( FormBuilder );
  private router = inject( Router );

  isLoading = signal( false );
  errorMessage = signal<string | null>( null );
  showPassword = signal( false );

  loginForm = this.fb.group({
    email: [ '', [ Validators.required, AuthValidators.emailFormat() ] ],
    password: [ '', [ Validators.required ] ],
  });



  togglePasswordVisibility(): void {
    this.showPassword.update( value => !value);
  };



  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  };



  async onSubmit(): Promise<void> {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set( true );
    this.errorMessage.set( null );

    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.loginWithPassword( email!, password! );

      this.isLoading.set( false );

      this.router.navigate([ '/admin' ]);
    } catch (error: any) {
      this.isLoading.set( false );
      this.errorMessage.set(
        error?.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos. Inténtalo de nuevo.'
          : error?.message || 'Ocurrió un error al iniciar sesión.'
      );
    }
  }



  async onGoogleLogin(): Promise<void> {
    this.isLoading.set( true );
    this.errorMessage.set( null );

    try {
      await this.authService.loginWithGoogle( '/auth/login' );
    } catch (error: any) {
      this.isLoading.set( false );
      this.errorMessage.set( error.message || 'Error al conectar con Google' );
    }
  }

};
