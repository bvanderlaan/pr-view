import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

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

  constructor(private remoteHostListService: RemoteHostListService) {
    this.remoteHosts = [];
  }

  ngOnInit() {
    const getRemoteHostListOperation: Observable<RemoteHost[]> = this.remoteHostListService.get();
    getRemoteHostListOperation.subscribe((remoteHosts) => {
      console.log('hello', remoteHosts)
      this.remoteHosts = remoteHosts;
    });
  }
}
