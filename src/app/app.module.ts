import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout';
import { RemoteHostModule } from './remotehost';
import { HomeModule } from './home';
import { AboutModule } from './about';
import { FeedModule } from './feed';

import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HomeModule,
    AboutModule,
    RemoteHostModule.forRoot(),
    FeedModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '**',
        redirectTo: '',
      }
    ])
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
