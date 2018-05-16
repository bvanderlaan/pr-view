import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Activity } from '../activitycard/activitycard.model';
import { FeedService } from './feed.service';

@Component({
  selector: 'activity-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [ FeedService ],
})
export class FeedComponent implements OnInit {
  public activityFeed: Activity[];
  public error: string;

  constructor(private feedService: FeedService) {
    this.activityFeed = [];
  }

  ngOnInit() {
    this.loadActivityFeed();
  }

  clearError() {
    this.error = '';
  }

  private loadActivityFeed() {
    const getActivityFeedOperation: Observable<Activity[]> = this.feedService.get();
    getActivityFeedOperation.subscribe((feed) => {
      this.activityFeed = feed;
    });
  }
}
