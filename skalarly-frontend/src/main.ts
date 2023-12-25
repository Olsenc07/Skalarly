import 'zone.js';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/error-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
// This feature can shave 60KBs from your initial bundle
//  lazily load the animation module via an async provider function:
// from  but may not be released yet
// import { provideAnimationsAsync } from '@angular/platform-browser/animations-async';
import { provideStore } from '@ngrx/store';
import {
  // defaultMalformedUriErrorHandler,
  routes
} from './app/app-routes/app-routing.module';

if (environment.production) {
  enableProdMode();
}
// avoid having application logic
// activate first module
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }, // Interceptors automatically involved in all components
    provideRouter(
      routes,
      withViewTransitions()
      // currently don't now how to apply this with angular 17
      // malformedUriErrorHandler: defaultMalformedUriErrorHandler
    ),
    // , provideAnimationsAsync()
    provideStore(), // State Management
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatSnackBarModule
    ), provideClientHydration()
  ]
})
  .then((started) => {
    console.log('Start up is working', started);
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
