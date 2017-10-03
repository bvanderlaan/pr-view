import { Component, OnInit, Input } from '@angular/core';

import { RemoteHost } from './remotehostcard.model';

@Component({
  selector: 'remote-host-card',
  templateUrl: './remotehostcard.component.html',
  styleUrls: ['./remotehostcard.component.css']
})
export class RemoteHostCardComponent implements OnInit {
  @Input() remote: RemoteHost;

  constructor() { }

  ngOnInit() {
  }

}
