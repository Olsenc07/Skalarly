import 'zone.js';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';
import {
  defaultMalformedUriErrorHandler,
  routes
} from './app/app-routes/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './app/assistant-level-code/custom-architecture-aids/interceptors/error-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';

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
    provideRouter(routes),
    provideStore(), // State Management
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatSnackBarModule,
      RouterModule.forRoot(routes, {
        malformedUriErrorHandler: defaultMalformedUriErrorHandler
      })
    )
  ]
})
  .then((started) => {
    console.log('Start up is working', started);
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
