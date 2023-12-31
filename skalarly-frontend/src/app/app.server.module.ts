import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { TransferState, BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ServerModule, RouterModule, 
    TransferState, BrowserModule]
})
export class AppServerModule {}
