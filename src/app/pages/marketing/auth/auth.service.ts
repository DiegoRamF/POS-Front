import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isNewGoogleUser = signal<boolean>(true);

  async loginWithGoogle(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('access_token', 'mock-google-token-12345');
        resolve();
      }, 1500);
    });
  }

  getUserTenants(): Observable<any[]> {
    if (this.isNewGoogleUser()) {
      return of([]).pipe(delay(800));
    } else {
      return of([{ id: 'tenant-99', name: 'Bodega Don Lucho' }]).pipe(delay(800));
    }
  }

  async completeOnboarding(data: { tenant_name: string, phone: string }): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Onboarding guardado en simulación:', data);
        this.isNewGoogleUser.set(false);
        resolve();
      }, 1500);
    });
  }
}
