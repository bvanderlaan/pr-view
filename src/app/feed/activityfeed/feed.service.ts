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
import { Activity } from '../activitycard/activitycard.model';

const whiteListedEvents = [
  'PullRequestEvent',
  'IssueCommentEvent',
  'PullRequestReviewCommentEvent',
];

function isWhitelistEvent({ type }) {
  return whiteListedEvents.includes(type);
}

@Injectable()
export class FeedService {
  protected remoteHosts: RemoteHost[];

  constructor(private http: HttpClient, private remoteHostListService: RemoteHostListService) {
    this.remoteHosts = [];
    this.loadRemoteHosts();
  }

  getRemoteHosts() : RemoteHost[] {
    return Array.prototype.concat([], this.remoteHosts);
  }

  get() : Observable<Activity[]> {
    if (!this.remoteHosts.length) return Observable.of([]);

    const { url, username } = this.remoteHosts[0];

    return this.http.get(`${url.replace(/\/$/, '')}/api/v3/users/${username}/received_events`)
      .map((response:Array<any>) => (
        response.filter(a => isWhitelistEvent(a))
          .map(a => Activity.fromJSON(a))
      ))
      .catch((resp:HttpErrorResponse) => Observable.throw(resp.error || 'Server error'));
  }

  loadRemoteHosts() {
    const getRemoteHostListOperation: Observable<RemoteHost[]> = this.remoteHostListService.get();
    getRemoteHostListOperation.subscribe((remoteHosts) => {
      this.remoteHosts = remoteHosts;
    });
  }
}
