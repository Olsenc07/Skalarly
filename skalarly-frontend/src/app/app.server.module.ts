import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { TransferState } from '@angular/platform-browser';

@NgModule({
  imports: [ServerModule, RouterModule, TransferState]
})
export class AppServerModule {}
