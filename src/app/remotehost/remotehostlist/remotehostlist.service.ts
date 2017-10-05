import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { RemoteHost } from '../remotehostcard/remotehostcard.model';

@Injectable()
export class RemoteHostListService {
  private remoteHostKey: string = 'remote-git-hosts';

  constructor() { }

  get() : Observable<RemoteHost[]> {
    const remoteHosts = JSON.parse(localStorage.getItem(this.remoteHostKey)) || {};
    const remoteHostList = Object.keys(remoteHosts).map(key => remoteHosts[key]);

    return Observable.of(remoteHostList);
  }

  delete(name) {
    const remoteHosts = JSON.parse(localStorage.getItem(this.remoteHostKey)) || {};

    if (remoteHosts.hasOwnProperty(name)) {
      delete remoteHosts[name];
      localStorage.setItem(this.remoteHostKey, JSON.stringify(remoteHosts));
    }

    return Observable.of(42);
  }
}
