import { ServerModule } from '@angular/platform-server';
import { AppComponent }from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

export class AppServerModule {}
bootstrapApplication(AppComponent, {
  providers: [
    ServerModule
  ]}).then((started) => {
  console.log('SSR start up is working', started);
})
.catch((err) => {
  console.error('error has occurred on SSR start up', err);
});
