import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddRemoteHostComponent } from './addremotehost/addremotehost.component'
import { RemoteHostListComponent } from './remotehostlist/remotehostlist.component'
import { RemoteHostCardComponent } from './remotehostcard/remotehostcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    AddRemoteHostComponent,
    RemoteHostListComponent,
    RemoteHostCardComponent,
  ],
  exports: [
    AddRemoteHostComponent,
    RemoteHostListComponent
  ]
})

export class RemoteHostModule {};
export const remoteHostRoutes = [
  {
    path: 'remote/add',
    component: AddRemoteHostComponent,
  },
  {
    path: 'remote',
    component: RemoteHostListComponent,
  },
];