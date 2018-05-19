import { Component, OnInit } from '@angular/core';

import { RemoteHost } from '../remotehostcard/remotehostcard.model';
import { RemoteHostListService } from './remotehostlist.service';

@Component({
  selector: 'remote-host-list',
  templateUrl: './remotehostlist.component.html',
  styleUrls: ['./remotehostlist.component.css'],
  providers: [ RemoteHostListService ],
})
export class RemoteHostListComponent implements OnInit {
  public remoteHosts: RemoteHost[];
  public title: string;

  constructor(private remoteHostListService: RemoteHostListService) {
    this.remoteHosts = [];
    this.title = 'PR-View';
  }

  ngOnInit() {
    this.remoteHosts = this.remoteHostListService.get();
  }

  delete(name: string) {
    this.remoteHostListService.delete(name);
    this.remoteHosts = this.remoteHostListService.get();
  }
}
