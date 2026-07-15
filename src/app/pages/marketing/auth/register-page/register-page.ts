import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { AuthValidators } from '../utils/auth-utils';
import { AuthService } from '../auth.service';
import { RegisterPayload } from '../auth.interfaces';

@Component({
  selector: 'register',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './register-page.html',
})
export default class RegisterPage {

  private authService = inject( AuthService )
  private fb = inject( FormBuilder );
  private router = inject( Router );

  isLoading = signal( false );
  errorMessage = signal<string | null>( null );
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



  onSubmit(): void {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set( true );
    this.errorMessage.set( null );

    const { confirmPassword, ...formValues } = this.registerForm.getRawValue();

    const registerData: RegisterPayload = {
      ...formValues,
      phone: Number( formValues.phone ),
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading.set( false );
        this.router.navigate([ '/auth/login' ]);
      },
      error: (err: unknown) => {
        this.isLoading.set( false );
        const msg = (err as any)?.error?.message;

        if (Array.isArray( msg )) {
          this.errorMessage.set( msg[0] );
        } else {
          this.errorMessage.set( msg || 'Ocurrió un error al crear la cuenta. Inténtalo nuevamente.' );
        }
      }
    });
  }



  async onGoogleLogin(): Promise<void> {
    this.isLoading.set( true );
    this.errorMessage.set( null );

    try {
      await this.authService.loginWithGoogle('/auth/complete-onboarding');

    } catch (error: any) {
      this.isLoading.set( false );
      this.errorMessage.set( error.message || 'Error al conectar con Google' );
    }
  }

};
