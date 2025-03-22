import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router'; // ✅ Ensure component inputs are bound
import { provideToastr } from 'ngx-toastr'; // ✅ Toastr for notifications

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // ✅ Ensures Angular handles component inputs properly
    provideHttpClient(withInterceptorsFromDi()), // ✅ Enables HTTP interceptors (for authentication, logging, etc.)
    provideAnimations(), // ✅ Required for Angular animations
    provideToastr(), // ✅ Globally enable Toastr notifications
  ]
}).catch(err => console.error('❌ Bootstrap error:', err)); // ✅ Improved error handling
