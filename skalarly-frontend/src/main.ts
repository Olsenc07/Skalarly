import 'zone.js';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/auth-interceptor';
import { ErrorInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/error-interceptor';
import { routes } from './app/app-routes/app-routing.module';

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
    },
    provideRouter(
      routes,
      withViewTransitions()
    ), provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule
    ), provideClientHydration()
  ]
})
  .then((started) => {
    console.log('Start up is working', started);
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
