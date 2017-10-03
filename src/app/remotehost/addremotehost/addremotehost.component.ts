import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { RemoteHost } from './addremotehost.model';
import { AddRemoteHostService } from './addremotehost.service';

@Component({
  selector: 'add-remote-host',
  templateUrl: './addremotehost.component.html',
  styleUrls: ['./addremotehost.component.css'],
  providers: [
    AddRemoteHostService,
  ]
})
export class AddRemoteHostComponent {
  public remoteHost: RemoteHost;
  public error: string;

  constructor(private addRemoteHostService: AddRemoteHostService, private router: Router) {
    this.remoteHost = new RemoteHost();
  }

  clearError() {
    this.error = '';
  }

  addRemoteHost() {
    const addRemoteHostOperation: Observable<number> = this.addRemoteHostService.add(this.remoteHost);
    addRemoteHostOperation.subscribe(() => {
      this.clearError();
      this.router.navigate(['/remote']);
    }, (err) => { this.error = `Sorry, failed to add the remote host: ${err}` });
  }
}
