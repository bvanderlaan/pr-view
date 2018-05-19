import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { RemoteHost } from '../remotehostcard/remotehostcard.model';
import { RemoteHostListService } from '../remotehostlist/remotehostlist.service';

@Component({
  selector: 'missing-remote-hosts',
  templateUrl: './missingremotehosts.component.html',
  styleUrls: ['./missingremotehosts.component.css'],
  providers: [ RemoteHostListService ],
})
export class MissingRemoteHostsComponent {
  constructor(private remoteHostListService: RemoteHostListService) {}

  get hasRemoteHosts() {
    return this.remoteHostListService.get().length > 0;
  }
}
