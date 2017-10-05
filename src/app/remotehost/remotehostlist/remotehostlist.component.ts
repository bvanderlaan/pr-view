import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public error: string;

  constructor(private remoteHostListService: RemoteHostListService, private router: Router) {
    this.remoteHosts = [];
  }

  ngOnInit() {
    this.loadRemoteHosts();
  }

  clearError() {
    this.error = '';
  }

  delete(name: string) {
    const deleteRemoteHostOperation: Observable<number> = this.remoteHostListService.delete(name);
    deleteRemoteHostOperation.subscribe(() => {
      this.clearError();
      this.loadRemoteHosts();
    }, (err) => { this.error = `Sorry, failed to remove the remote host: ${err}` });
  }

  private loadRemoteHosts() {
    const getRemoteHostListOperation: Observable<RemoteHost[]> = this.remoteHostListService.get();
    getRemoteHostListOperation.subscribe((remoteHosts) => {
      this.remoteHosts = remoteHosts;
    });
  }
}
