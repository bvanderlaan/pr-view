'use strict';


import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Observable } from 'rxjs/Rx';

import { FeedService } from './feed.service';
import {
  PRState,
  PRActivity,
  Activity,
  Actor,
  Repository,
  PullRequest
} from '../activitycard/activitycard.model';
import { RemoteHost, RemoteHostListService } from '../../remotehost';

describe('FeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeedService,
        RemoteHostListService,
      ]
    });
  });

  it('should be created', inject([FeedService], (service: FeedService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an empty feed array if no remote hosts',
    inject([FeedService, RemoteHostListService], (service: FeedService, remoteHostListService: RemoteHostListService) => {
      spyOn(remoteHostListService, 'get').and.returnValue([]);

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed).toEqual([]);
    });
  }));

  it('should throw error if API failed',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    const remoteHost = new RemoteHost('123', 'me', 'http://git.me', 'bvanderlaan', 'token', new Date(), new Date());
    spyOn(remoteHostListService, 'get').and.returnValue([remoteHost]);

    service.get()
      .catch(actualError => {
        expect(actualError).toBeTruthy();
        expect(actualError).toEqual({ message: 'boom' });
        expect(Observable.of(actualError)).toBeTruthy();
        return Observable.of(actualError);
      })
      .subscribe();

    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  }));

  it('should get the feed',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    let response = [{
      id: '256826',
      type: 'PullRequestReviewCommentEvent',
      actor: {
        id: 119,
        display_login: 'rwilco',
        login: 'rwilco',
        url: 'https://github.com/api/v3/users/rwilco',
        avatar_url: 'https://github.com/avatars/u/119?'
      },
      repo: {
        id: 9,
        name: 'bvanderlaan/test',
        url: 'https://github.com/api/v3/repos/bvanderlaan/test'
      },
      payload: {
        action: 'closed',
        pull_request: {
          merged: true,
          number: '1234',
          title: 'This is a test PullRequest',
          body: 'This is the body of the test PullRequest',
          html_url: 'https://github.com/bvanderlaan/test/pull/1234'
        },
      },
      public: true,
      created_at: '2017-11-24T18:32:23Z',
      org: {
        id: 11,
        login: 'bvanderlaan',
        gravatar_id: '',
        url: 'https://github.com/api/v3/orgs/bvanderlaan',
        avatar_url: 'https://github.com/avatars/u/11?'
      }
    }];

    const remoteHost = new RemoteHost('123', 'me', 'http://git.me', 'bvanderlaan', 'token', new Date(), new Date());
    spyOn(remoteHostListService, 'get').and.returnValue([remoteHost]);

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed.length).toEqual(1);

      const actor = new Actor(119, 'rwilco', 'http://git.me/rwilco', 'https://github.com/avatars/u/119?');
      const repo = new Repository(9, 'bvanderlaan/test', 'https://github.com/api/v3/repos/bvanderlaan/test');
      const pr = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest', PRState.Merged);

      const activity = feed[0];
      expect(activity.lastActivity.id).toEqual('256826');
      expect(activity.lastActivity.type).toEqual('PullRequestReviewCommentEvent');
      expect(activity.lastActivity.actor).toEqual(actor);
      expect(activity.repo).toEqual(repo);
      expect(activity.pr).toEqual(pr);
      expect(activity.lastActivity.created_at).toEqual(new Date('2017-11-24T18:32:23Z'));
    });
    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush(response);
  }));
});
