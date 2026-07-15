import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { delay, map, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { OAuthProvider, OnboardingPayload, RegisterPayload, Tenant } from './auth.interfaces';

const TENANT_STORAGE_KEY = 'selected_tenant_id';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject( HttpClient );

  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey,
  );

  private readonly session$ = new Observable<Session | null>( (subscriber) => {
    this.supabase.auth.getSession().then( ({data}) => {
      subscriber.next( data.session );
    });

    const { data: { subscription } } = this.supabase.auth.onAuthStateChange(
      (event, session) => {
        subscriber.next( session );
      },
    );

    return () => subscriber.unsubscribe();
  });

  readonly session = toSignal( this.session$, { initialValue: null });

  readonly selectedTenantId = signal<string | null>( localStorage.getItem( TENANT_STORAGE_KEY ) );

  readonly isAuthenticated = computed( () => !!this.session() );



  get accessToken(): string | null {
    return this.session()?.access_token ?? null;
  };



  register( data: RegisterPayload ): Observable<unknown> {
    return this.http.post( `${environment.apiUrl}/auth/register`, data );
  };



  async loginWithGoogle( redirectToRoute: string = '/auth/login' ): Promise<void> {
    const provider: OAuthProvider = 'google';
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectToRoute}`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });
    if (error) throw error;
  }



  completeOnboarding(data: OnboardingPayload): Observable<Tenant> {
    return this.http
      .post<{ tenant: Tenant }>( `${environment.apiUrl}/auth/complete-onboarding`, data )
      .pipe(
        map( (res) => res.tenant )
      );
  };



  getUserTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>( `${environment.apiUrl}/auth/tenants` );
  };



  selectTenant( tenantId: string ): void {
    localStorage.setItem( TENANT_STORAGE_KEY, tenantId );
    this.selectedTenantId.set( tenantId );
  };



  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    localStorage.removeItem( TENANT_STORAGE_KEY );
    this.selectedTenantId.set( null );
  };



  async hasActiveSession(): Promise<boolean> {
    const { data } = await this.supabase.auth.getSession();
    return !!data.session;
  };

};
