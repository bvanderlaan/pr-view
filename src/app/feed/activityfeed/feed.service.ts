import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { RemoteHost, RemoteHostListService } from '../../remotehost';
import { Activity, PRActivity } from '../activitycard/activitycard.model';

const whiteListedEvents = [
  'PullRequestEvent',
  'IssueCommentEvent',
  'PullRequestReviewCommentEvent',
];

function isWhitelistEvent({ type }) {
  return whiteListedEvents.includes(type);
}

function sortOldestToNewestGroupByPR(lhs:Activity, rhs:Activity) {
  return lhs.pr.id === rhs.pr.id
    ? lhs.created_at < rhs.created_at
      ? 1
      : -1
    : lhs.pr.id < rhs.pr.id
      ? -1
      : 1;
}

function sortByLatestActivity(lhs:PRActivity, rhs:PRActivity) {
  return (lhs.lastActivity.created_at < rhs.lastActivity.created_at)
    ? 1
    : -1;
}

function includesPRActivity(activities: PRActivity[], prNumber: string) {
  return activities.filter((a:PRActivity) => (a.pr.id === prNumber))[0]
}

@Injectable()
export class FeedService {
  constructor(private http: HttpClient, private remoteHostListService: RemoteHostListService) {
  }

  get() : Observable<PRActivity[]> {
    const remoteHosts = this.remoteHostListService.get();
    if (!remoteHosts.length) return Observable.of([]);

    const { url, username } = remoteHosts[0];

    return this.http.get(`${url.replace(/\/$/, '')}/api/v3/users/${username}/received_events`)
      .map((response:Array<any>) => (
        response.filter(a => isWhitelistEvent(a))
          .map(a => Activity.fromJSON(a, url.replace(/\/$/, '')))
          .sort(sortOldestToNewestGroupByPR)
          .reduce((activities: PRActivity[], activity: Activity) => {
            let prActivity = includesPRActivity(activities, activity.pr.id);
            if (prActivity) {
              prActivity.addActivity(activity);
            } else {
              prActivity = new PRActivity(activity);
              activities.push(prActivity);
            }

            return activities;
          }, new Array<PRActivity>())
          .sort(sortByLatestActivity)
      ))
      .catch((resp:HttpErrorResponse) => Observable.throw(resp.error || 'Server error'));
  }
}
