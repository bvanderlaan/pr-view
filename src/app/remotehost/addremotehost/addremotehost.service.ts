import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { RemoteHost } from './addremotehost.model';

@Injectable()
export class AddRemoteHostService {

  constructor() { }

  add(remoteHost: RemoteHost) : Observable<RemoteHost> {
    if (localStorage.getItem(remoteHost.name)) {
      return Observable.throw('Host name already exists');
    }

    return Observable.create(() => localStorage.setItem(remoteHost.name, JSON.stringify(remoteHost)));
  }
}
