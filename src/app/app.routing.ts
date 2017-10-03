import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { remoteHostRoutes } from './remotehost';

const routes: Routes = Array.prototype.concat([
    {
      path: '',
      component: HomeComponent,
    },
  ],
  remoteHostRoutes,
  [
    {
      path: '**',
      redirectTo: '',
    }
  ]
);

export const routing = RouterModule.forRoot(routes);