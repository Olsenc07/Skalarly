import { ApplicationRef } from '@angular/core';
import { AppComponent }from 'src/app/app.component'; // is this the problem?
import { ServerModule } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';

 export class AppServerPromise {
 }
// export async function AppServerPromise(): Promise<ApplicationRef> {
//   try {
//     const appRef = await bootstrapApplication(AppComponent, {
//       providers: [
//         ServerModule,
//       ]
//     });
//     console.log('standalone');
//     return appRef;
//   } catch (err) {
//     console.error('Bootstrap error', err);
//     throw err;
//   }
// }