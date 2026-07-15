import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { authInterceptor } from './pages/marketing/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
    providePrimeNG({
      unstyled: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'modo-oscuro',
        }
      }
    }),
    provideHttpClient(
      withInterceptors([ authInterceptor ])
    ),
  ],
};
