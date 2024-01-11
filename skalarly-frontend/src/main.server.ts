import { ApplicationRef, NgModule } from '@angular/core';
import { AppComponent }from './app/app.component';
import { ServerModule } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';

export function AppServerPromise(): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, {
    providers: [
      ServerModule,
    ]
  });
}