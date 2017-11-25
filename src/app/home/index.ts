import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component'

const routing: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routing),
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ]
})

export class HomeModule {};
