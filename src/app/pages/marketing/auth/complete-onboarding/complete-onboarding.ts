import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../auth.service';
import { AuthValidators } from '../utils/auth-utils';
import { OnboardingPayload } from '../auth.interfaces';

@Component({
  selector: 'complete-onboarding',
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './complete-onboarding.html',
})
export default class CompleteOnboarding {

  private readonly authService = inject( AuthService );
  private readonly fb = inject( FormBuilder );
  private readonly router = inject( Router );

  isLoading = signal( false );
  errorMessage = signal<string | null>( null );

  onboardingForm = this.fb.nonNullable.group({
    tenant_name: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
    full_name: [ '', [ Validators.required, AuthValidators.nameFormat() ] ],
  });

  isFieldInvalid( fieldName: string ): boolean {
    const control = this.onboardingForm.get( fieldName );
    return !!( control && control.invalid && ( control?.touched || control?.dirty ) );
  };



  onSubmit(): void {
    if ( this.onboardingForm.invalid ) {
      this.onboardingForm.markAllAsTouched();
      return;
    };

    this.isLoading.set( true );
    this.errorMessage.set( null );

    const onboardingData: OnboardingPayload = this.onboardingForm.getRawValue();

    this.authService.completeOnboarding( onboardingData ).subscribe({
      next: ( tenant ) => {
        this.isLoading.set( false );

        if ( tenant?.id ) {
          this.authService.selectTenant( tenant.id) ;
        }

        this.router.navigate([ '/admin' ]);
      },
      error: (err: unknown) => {
        this.isLoading.set( false );
        const msg = ( err as any )?.error?.message;

        if ( Array.isArray( msg ) ) {
          this.errorMessage.set( msg[0] );
        } else {
          this.errorMessage.set( msg || 'Ocurrió un error al configurar tu negocio. Inténtalo nuevamente.' );
        };
      },
    });
  };



  async onSignOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigate([ '/auth/login' ]);
  };

};
