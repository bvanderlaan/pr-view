import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LayoutModule } from './layout';
import { RemoteHostModule } from './remotehost';
import { HomeComponent } from './home/home.component';

import { RootComponent } from './root/root.component';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    RemoteHostModule,
    routing,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
