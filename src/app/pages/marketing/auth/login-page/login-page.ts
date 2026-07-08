import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthValidators } from '../utils/auth-utils';

@Component({
  selector: 'login',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './login-page.html',
})
export default class LoginPage {

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



  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const loginData = this.loginForm.getRawValue();
    console.log('Datos listos para enviar a Supabase:', loginData);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.isLoading.set(false);

      this.router.navigate(['/']);
    } catch (error) {
      this.isLoading.set(false);
      this.errorMessage.set('Credenciales incorrectas. Inténtalo de nuevo.');
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
