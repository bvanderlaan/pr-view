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

  save() {
    this.feedService.saveFeed(this.activityFeed);
  }

  clearError() {
    this.error = '';
  }

  private loadActivityFeed() {
    Observable.timer(0, 60000)
      .flatMap(() => this.feedService.get())
      .subscribe((feed) => {
        this.activityFeed = feed;
      });
  }
}
