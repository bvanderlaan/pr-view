import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AddRemoteHostComponent } from './addremotehost/addremotehost.component'
import { RemoteHostListComponent } from './remotehostlist/remotehostlist.component'
import { RemoteHostCardComponent } from './remotehostcard/remotehostcard.component';

const routing: Routes = [
  {
    path: 'remote/add',
    component: AddRemoteHostComponent,
  },
  {
    path: 'remote/:id',
    component: AddRemoteHostComponent,
  },
  {
    path: 'remote',
    component: RemoteHostListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routing),
  ],
  declarations: [
    AddRemoteHostComponent,
    RemoteHostListComponent,
    RemoteHostCardComponent,
  ],
  exports: [
    AddRemoteHostComponent,
    RemoteHostListComponent,
  ]
})

export class RemoteHostModule {};
