import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component'

const routing: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routing),
  ],
  declarations: [
    AboutComponent,
  ],
  exports: [
    AboutComponent,
  ]
})

export class AboutModule {};
