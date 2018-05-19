import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { RemoteHost } from '../remotehostcard/remotehostcard.model';

@Injectable()
export class RemoteHostListService {
  private remoteHostKey: string = 'remote-git-hosts';
  private remoteHosts: RemoteHost[];

  constructor() {
    this.remoteHosts = [];
  }

  get() : RemoteHost[] {
    if (this.remoteHosts.length === 0) {
      const remoteHosts = JSON.parse(localStorage.getItem(this.remoteHostKey)) || {};
      const remoteHostList = Object.keys(remoteHosts).map(key => remoteHosts[key]);
      this.remoteHosts = remoteHostList;
    }

    return this.remoteHosts;
  }

  delete(name:string) : boolean {
    const remoteHosts = JSON.parse(localStorage.getItem(this.remoteHostKey)) || {};

    if (remoteHosts.hasOwnProperty(name)) {
      delete remoteHosts[name];
      localStorage.setItem(this.remoteHostKey, JSON.stringify(remoteHosts));
      this.remoteHosts = Object.keys(remoteHosts).map(key => remoteHosts[key]);
    }

    return true;
  }
}
