import { ApplicationRef } from '@angular/core';
import { AppComponent }from './app/app.component';
import { ServerModule } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';

export async function AppServerPromise(): Promise<ApplicationRef> {
  try {
    const appRef = await bootstrapApplication(AppComponent, {
      providers: [
        ServerModule,
      ]
    });
    console.log('standalone');
    return appRef;
  } catch (err) {
    console.error('Bootstrap error', err);
    throw err;
  }
}