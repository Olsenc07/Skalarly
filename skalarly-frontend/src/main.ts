import 'zone.js/dist/zone';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedInterceptorModule } from './app/custom-architecture-aids/interceptors/shared-interceptor.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app-routes/app-routing.module';

if (environment.production) {
  enableProdMode();
}

// avoid having application logic
// activate first module
bootstrapApplication(AppComponent, {
  providers: [
    SharedInterceptorModule, // Interceptors automatically involved all components
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideStore() // State Management
  ]
})
  .then((started) => {
    console.log('Start up is working', started);
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
