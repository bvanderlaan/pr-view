import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './activityfeed/feed.component'
import { ActivityCardComponent } from './activitycard/activitycard.component';
import { RemoteHostModule } from '../remotehost';
import { GithubAPIInterceptor } from './githubAuthIntercepter';

const routing: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    RemoteHostModule.forRoot(),
    RouterModule,
    RouterModule.forRoot(routing),
  ],
  declarations: [
    FeedComponent,
    ActivityCardComponent,
  ],
  exports: [
    FeedComponent,
  ],
})

export class FeedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FeedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GithubAPIInterceptor,
          multi: true
        }
      ]
    };
  }
};
