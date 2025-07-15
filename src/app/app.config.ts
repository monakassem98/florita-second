import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura, // This line sets the Aura theme
        // You can add options here if needed, e.g., for dark mode or CSS layers
        // options: {
        //   darkModeSelector: '.my-app-dark', // If you have a custom dark mode class
        //   cssLayer: {
        //     name: 'primeng',
        //     order: 'tailwind, primeng', // Example for Tailwind CSS integration
        //   },
        // },
      },
    }),
  ],
};
