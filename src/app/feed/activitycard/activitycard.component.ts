import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Activity, Actor, Repository, PullRequest } from './activitycard.model';

@Component({
  selector: 'activity-card',
  templateUrl: './activitycard.component.html',
  styleUrls: ['./activitycard.component.css']
})
export class ActivityCardComponent {
  @Input() activity: Activity;
  @Output() onDelete = new EventEmitter<string>();

  constructor() {
    this.activity = new Activity('-1', '', new Actor(), new Repository(), new PullRequest(), '', new Date());
  }
}
