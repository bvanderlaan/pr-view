import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { RemoteHost } from './remotehostcard.model';

@Component({
  selector: 'remote-host-card',
  templateUrl: './remotehostcard.component.html',
  styleUrls: ['./remotehostcard.component.css']
})
export class RemoteHostCardComponent implements OnInit {
  @Input() remote: RemoteHost;
  @Output() onDelete = new EventEmitter<string>();

  ngOnInit() {
    this.remote = new RemoteHost('', '', '', '', '', new Date(), new Date());
  }

  constructor() { }

  delete() {
    this.onDelete.emit(this.remote.name);
  }

}
