import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = Array.prototype.concat([
    {
      path: '',
      component: HomeComponent,
    },
  ],
  [
    {
      path: '**',
      redirectTo: '',
    }
  ]
);

export const routing = RouterModule.forRoot(routes);