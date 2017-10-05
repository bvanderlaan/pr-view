import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
export class AddRemoteHostComponent implements OnInit, OnDestroy {
  public remoteHost: RemoteHost;
  public error: string;
  public isEdit: boolean;
  private subject: any;

  constructor(private addRemoteHostService: AddRemoteHostService,
              private router: Router,
              private route: ActivatedRoute) {
    this.remoteHost = new RemoteHost();
  }

  ngOnInit() {
    this.isEdit = false;
    this.subject = this.route.params.subscribe(params => {
      if (params['id']) {
        const getRemoteHostOperation: Observable<RemoteHost> = this.addRemoteHostService.get(params['id']);
        getRemoteHostOperation.subscribe((host) => {
          this.isEdit = true;
          this.remoteHost = host;
        }, (err) => { this.error = `Sorry, failed to find the host you wanted to edit: ${err}` });
      }
    });
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  clearError() {
    this.error = '';
  }

  submit() {
    if (this.isEdit) {
      return this.updateRemoteHost();
    }
    return this.addRemoteHost();
  }

  addRemoteHost() {
    const addRemoteHostOperation: Observable<number> = this.addRemoteHostService.add(this.remoteHost);
    addRemoteHostOperation.subscribe(() => {
      this.clearError();
      this.router.navigate(['/remote']);
    }, (err) => { this.error = `Sorry, failed to add the remote host: ${err}` });
  }

  updateRemoteHost() {
    const updateRemoteHostOperation: Observable<number> = this.addRemoteHostService.update(this.remoteHost);
    updateRemoteHostOperation.subscribe(() => {
      this.clearError();
      this.router.navigate(['/remote']);
    }, (err) => { this.error = `Sorry, failed to update the remote host: ${err}` });
  }
}
