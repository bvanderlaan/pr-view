import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { RemoteHost } from '../remotehostcard/remotehostcard.model';
import { RemoteHostListService } from '../remotehostlist/remotehostlist.service';

@Component({
  selector: 'missing-remote-hosts',
  templateUrl: './missingremotehosts.component.html',
  styleUrls: ['./missingremotehosts.component.css'],
  providers: [ RemoteHostListService ],
})
export class MissingRemoteHostsComponent implements OnInit {
  public remoteHosts: RemoteHost[];

  constructor(private remoteHostListService: RemoteHostListService) {
    this.remoteHosts = [];
  }

  ngOnInit() {
    this.loadRemoteHosts();
  }

  get hasRemoteHosts() {
    return this.remoteHosts.length > 0
  }

  private loadRemoteHosts() {
    const getRemoteHostListOperation: Observable<RemoteHost[]> = this.remoteHostListService.get();
    getRemoteHostListOperation.subscribe((remoteHosts) => {
      this.remoteHosts = remoteHosts;
    });
  }
}
