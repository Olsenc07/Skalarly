import 'zone.js';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent }from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [
    ServerModule
  ]
})
export class AppServerModule {}
bootstrapApplication(AppComponent).then((started) => {
  console.log('SSR start up is working', started);
})
.catch((err) => {
  console.error('error has occured on SSR start up', err);
});
