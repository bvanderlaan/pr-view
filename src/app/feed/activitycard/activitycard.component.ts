import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  Output,
  AfterViewInit
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

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
export class ActivityCardComponent implements AfterViewInit {
  @Input() activity: PRActivity;
  @Output() onRead = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  constructor(private element: ElementRef) {
    const actor = new Activity('-1', '', new Actor(), new Repository(), new PullRequest(), '', new Date());
    this.activity = new PRActivity(actor);
  }

  ngAfterViewInit() {
    const node = this.element.nativeElement.querySelector('a.pr-link');
    if (node) {
      Observable.fromEvent(node, 'click')
        .subscribe({
          next: () => {
            this.activity.markRead();
            this.onRead.emit(this.activity.pr.id);
          },
        });
    }
  }

  clearActivity() {
    this.activity.delete();
    this.onDelete.emit(this.activity.pr.id);
  }
}
