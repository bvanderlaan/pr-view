import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RemoteHost } from './remotehostcard.model';

@Component({
  selector: 'remote-host-card',
  templateUrl: './remotehostcard.component.html',
  styleUrls: ['./remotehostcard.component.css']
})
export class RemoteHostCardComponent {
  @Input() remote: RemoteHost;
  @Output() onDelete = new EventEmitter<string>();

  constructor() {
    this.remote = new RemoteHost('', '', '', '', '', new Date(), new Date());
  }

  delete() {
    this.onDelete.emit(this.remote.name);
  }

}
