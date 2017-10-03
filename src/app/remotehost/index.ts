import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddRemoteHostComponent } from './addremotehost/addremotehost.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    AddRemoteHostComponent,
  ],
  exports: [
    AddRemoteHostComponent
  ]
})

export class RemoteHostModule {};
export const remoteHostRoutes = [
  {
    path: 'remote/add',
    component: AddRemoteHostComponent,
  },
];