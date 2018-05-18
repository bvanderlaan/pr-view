import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { PRActivity } from '../activitycard/activitycard.model';
import { FeedService } from './feed.service';

@Component({
  selector: 'activity-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [ FeedService ],
})
export class FeedComponent implements OnInit {
  public activityFeed: PRActivity[];
  public error: string;

  constructor(private feedService: FeedService) {
    this.activityFeed = [];
  }

  ngOnInit() {
    this.loadActivityFeed();
  }

  get hasFeed() {
    return this.activityFeed.length > 0;
  }

  clearError() {
    this.error = '';
  }

  private loadActivityFeed() {
    const getActivityFeedOperation: Observable<PRActivity[]> = this.feedService.get();
    getActivityFeedOperation.subscribe((feed) => {
      this.activityFeed = feed;
    });
  }
}
