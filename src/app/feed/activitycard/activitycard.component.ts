import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  Actor,
  Activity,
  PRActivity,
  Repository,
  PullRequest,
} from './activitycard.model';

@Component({
  selector: 'activity-card',
  templateUrl: './activitycard.component.html',
  styleUrls: ['./activitycard.component.css']
})
export class ActivityCardComponent {
  @Input() activity: PRActivity;
  @Output() onDelete = new EventEmitter<string>();

  constructor() {
    const actor = new Activity('-1', '', new Actor(), new Repository(), new PullRequest(), '', new Date());
    this.activity = new PRActivity(actor);
  }
}
