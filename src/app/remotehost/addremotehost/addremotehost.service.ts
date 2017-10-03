import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { RemoteHost } from './addremotehost.model';

@Injectable()
export class AddRemoteHostService {
  private remoteHostKey: string = 'remote-git-hosts';

  constructor() { }

  add(remoteHost: RemoteHost) : Observable<number> {
    const remoteHosts = JSON.parse(localStorage.getItem(this.remoteHostKey)) || {};

    if (remoteHosts.hasOwnProperty(remoteHost.name)) {
      return Observable.throw('Host name already exists');
    }

    remoteHosts[remoteHost.name] = remoteHost;
    remoteHosts[remoteHost.name].id = UUID.UUID();
    remoteHosts[remoteHost.name].created_at = new Date();
    localStorage.setItem(this.remoteHostKey, JSON.stringify(remoteHosts));

    return Observable.of(42);
  }
}
