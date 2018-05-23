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
    spyOn(localStorage, 'setItem').and.returnValue(null);

    service.get()
      .catch(actualError => {
        expect(actualError).toBeTruthy();
        expect(actualError).toEqual({ message: 'boom' });
        expect(Observable.of(actualError)).toBeTruthy();
        expect(localStorage.setItem).not.toHaveBeenCalled();
        return Observable.of(actualError);
      })
      .subscribe();

    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  }));

  it('should get the feed from the remote',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    let response = [{
      id: '256826',
      type: 'PullRequestReviewCommentEvent',
      actor: {
        id: 119,
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
        pull_request: {
          merged: true,
          state: 'closed',
          number: '1234',
          title: 'This is a test PullRequest',
          body: 'This is the body of the test PullRequest',
          html_url: 'https://github.com/bvanderlaan/test/pull/1234',
          user: {
            id: 119,
            login: 'rwilco',
            url: 'https://github.com/api/v3/users/rwilco',
            avatar_url: 'https://github.com/avatars/u/119?',
          },
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
    spyOn(localStorage, 'setItem').and.returnValue(null);
    spyOn(localStorage, 'getItem').and.returnValue(null);

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed.length).toEqual(1);

      const actor = new Actor(119, 'rwilco', 'http://git.me/rwilco', 'https://github.com/avatars/u/119?');
      const repo = new Repository(9, 'bvanderlaan/test', 'http://git.me/bvanderlaan/test');
      const pr = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest', actor, PRState.Merged);

      const activity = feed[0];
      expect(activity.lastActivity.id).toEqual('256826');
      expect(activity.lastActivity.type).toEqual('PullRequestReviewCommentEvent');
      expect(activity.lastActivity.actor).toEqual(actor);
      expect(activity.repo).toEqual(repo);
      expect(activity.pr).toEqual(pr);
      expect(activity.lastActivity.created_at).toEqual(new Date('2017-11-24T18:32:23Z'));
      expect(activity.isDeleted).toBeFalsy();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush(response);
  }));

  it('should merge the feed from the remote and local storage',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    let response = [{
      id: '256826',
      type: 'PullRequestReviewCommentEvent',
      actor: {
        id: 119,
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
        pull_request: {
          merged: true,
          state: 'closed',
          number: '1234',
          title: 'This is a test PullRequest',
          body: 'This is the body of the test PullRequest',
          html_url: 'https://github.com/bvanderlaan/test/pull/1234',
          user: {
            id: 119,
            login: 'rwilco',
            url: 'https://github.com/api/v3/users/rwilco',
            avatar_url: 'https://github.com/avatars/u/119?',
          },
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
    spyOn(localStorage, 'setItem').and.returnValue(null);
    spyOn(localStorage, 'getItem').and.returnValue(`[{
      "activities": [{
        "id": "000000",
        "action": "commented",
        "type": "PullRequestEvent",
        "created_at": "2018-11-24T18:32:23Z",
        "actor": {
          "id": 5,
          "name": "jfive",
          "url": "http://git.me/jfive",
          "image": "https://github.com/avatars/u/5?"
        }
      }],
      "repo": {
        "id": 9,
        "name": "bvanderlaan/test",
        "url": "https://github.com/bvanderlaan/test"
      },
      "pr": {
        "id": "5555",
        "title": "This is another test PullRequest",
        "url": "https://github.com/bvanderlaan/test/pull/5555",
        "body": "This is the body of the other test PullRequest",
        "state": 0,
        "owner": {
          "id": 5,
          "name": "jfive",
          "url": "http://git.me/jfive",
          "image": "https://github.com/avatars/u/5?"
        }
      }
    }]`);

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed.length).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalled();

      const actor1 = new Actor(5, 'jfive', 'http://git.me/jfive', 'https://github.com/avatars/u/5?');
      const repo1 = new Repository(9, 'bvanderlaan/test', 'https://github.com/bvanderlaan/test');
      const pr1 = new PullRequest('5555', 'This is another test PullRequest', 'https://github.com/bvanderlaan/test/pull/5555', 'This is the body of the other test PullRequest', actor1, PRState.Open);

      const activity1 = feed[0];
      expect(activity1.lastActivity.id).toEqual('000000');
      expect(activity1.lastActivity.type).toEqual('PullRequestEvent');
      expect(activity1.lastActivity.actor).toEqual(actor1);
      expect(activity1.repo).toEqual(repo1);
      expect(activity1.pr).toEqual(pr1);
      expect(activity1.isDeleted).toBeFalsy();
      expect(activity1.lastActivity.created_at).toEqual(new Date('2018-11-24T18:32:23Z'));

      const actor2 = new Actor(119, 'rwilco', 'http://git.me/rwilco', 'https://github.com/avatars/u/119?');
      const repo2 = new Repository(9, 'bvanderlaan/test', 'http://git.me/bvanderlaan/test');
      const pr2 = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest', actor2, PRState.Merged);
      const activity2 = feed[1];
      expect(activity2.lastActivity.id).toEqual('256826');
      expect(activity2.lastActivity.type).toEqual('PullRequestReviewCommentEvent');
      expect(activity2.lastActivity.actor).toEqual(actor2);
      expect(activity2.repo).toEqual(repo2);
      expect(activity2.pr).toEqual(pr2);
      expect(activity2.isDeleted).toBeFalsy();
      expect(activity2.lastActivity.created_at).toEqual(new Date('2017-11-24T18:32:23Z'));
    });
    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush(response);
  }));

  it('should merge the feed and local into single PR activity if both are for the same PR',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    let response = [{
      id: '256826',
      type: 'PullRequestReviewCommentEvent',
      actor: {
        id: 119,
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
        pull_request: {
          merged: true,
          state: 'closed',
          number: '1234',
          title: 'This is a test PullRequest',
          body: 'This is the body of the test PullRequest',
          html_url: 'https://github.com/bvanderlaan/test/pull/1234',
          user: {
            id: 119,
            login: 'rwilco',
            url: 'https://github.com/api/v3/users/rwilco',
            avatar_url: 'https://github.com/avatars/u/119?',
          },
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
    spyOn(localStorage, 'setItem').and.returnValue(null);
    spyOn(localStorage, 'getItem').and.returnValue(`[{
      "activities": [{
        "id": "000000",
        "action": "commented",
        "type": "PullRequestEvent",
        "created_at": "2018-11-24T18:32:23Z",
        "actor": {
          "id": 5,
          "name": "jfive",
          "url": "http://git.me/jfive",
          "image": "https://github.com/avatars/u/5?"
        }
      }],
      "repo": {
        "id": 9,
        "name": "bvanderlaan/test",
        "url": "https://github.com/bvanderlaan/test"
      },
      "pr": {
        "id": "1234",
        "title": "This is a test PullRequest",
        "url": "https://github.com/bvanderlaan/test/pull/1234",
        "body": "This is the body of the test PullRequest",
        "state": 0,
        "owner": {
          "id": 119,
          "name": "rwilco",
          "url": "http://git.me/rwilco",
          "image": "https://github.com/avatars/u/119?"
        }
      }
    }]`);

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalled();

      const actor1 = new Actor(5, 'jfive', 'http://git.me/jfive', 'https://github.com/avatars/u/5?');
      const actor2 = new Actor(119, 'rwilco', 'http://git.me/rwilco', 'https://github.com/avatars/u/119?');
      const repo = new Repository(9, 'bvanderlaan/test', 'https://github.com/bvanderlaan/test');
      const pr = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest', actor2, PRState.Merged);

      const activity = feed[0];
      expect(activity.activities[0].id).toEqual('000000');
      expect(activity.activities[1].id).toEqual('256826');
      expect(activity.activities[0].type).toEqual('PullRequestEvent');
      expect(activity.activities[1].type).toEqual('PullRequestReviewCommentEvent');
      expect(activity.activities[0].created_at).toEqual(new Date('2018-11-24T18:32:23Z'));
      expect(activity.activities[1].created_at).toEqual(new Date('2017-11-24T18:32:23Z'));
      expect(activity.activities[0].actor).toEqual(actor1);
      expect(activity.activities[1].actor).toEqual(actor2);
      expect(activity.repo).toEqual(repo);
      expect(activity.pr).toEqual(pr);
    });
    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush(response);
  }));

  it('should reap deleted PR activities',
    inject([FeedService, RemoteHostListService, HttpTestingController], (service: FeedService, remoteHostListService: RemoteHostListService, backend: HttpTestingController) => {
    const remoteHost = new RemoteHost('123', 'me', 'http://git.me', 'bvanderlaan', 'token', new Date(), new Date());
    spyOn(remoteHostListService, 'get').and.returnValue([remoteHost]);
    spyOn(localStorage, 'setItem').and.returnValue(null);
    spyOn(localStorage, 'getItem').and.returnValue(`[{
      "deleted": true,
      "activities": [{
        "id": "000000",
        "action": "commented",
        "type": "PullRequestEvent",
        "created_at": "2018-05-20T18:32:23Z",
        "actor": {
          "id": 5,
          "name": "jfive",
          "url": "http://git.me/jfive",
          "image": "https://github.com/avatars/u/5?"
        }
      }],
      "repo": {
        "id": 9,
        "name": "bvanderlaan/test",
        "url": "https://github.com/bvanderlaan/test"
      },
      "pr": {
        "id": "5555",
        "title": "This is another test PullRequest",
        "url": "https://github.com/bvanderlaan/test/pull/5555",
        "body": "This is the body of the other test PullRequest",
        "state": 0,
        "owner": {
          "id": 5,
          "name": "jfive",
          "url": "http://git.me/jfive",
          "image": "https://github.com/avatars/u/5?"
        }
      }
    }, {
      "deleted": true,
      "activities": [{
        "id": "111111",
        "action": "commented",
        "type": "PullRequestEvent",
        "created_at": "2018-04-01T18:32:23Z",
        "actor": {
          "id": 119,
          "name": "rwilco",
          "url": "http://git.me/rwilco",
          "image": "https://github.com/avatars/u/119?"
        }
      }],
      "repo": {
        "id": 9,
        "name": "bvanderlaan/test",
        "url": "https://github.com/bvanderlaan/test"
      },
      "pr": {
        "id": "4444",
        "title": "This is yet another test PullRequest",
        "url": "https://github.com/bvanderlaan/test/pull/5555",
        "body": "This is the body of yet another other test PullRequest",
        "state": 0,
        "owner": {
          "id": 119,
          "name": "rwilco",
          "url": "http://git.me/rwilco",
          "image": "https://github.com/avatars/u/119?"
        }
      }
    }]`);

    spyOn(Date, 'now').and.returnValue(1526909640163); // May 21, 2018

    service.get().subscribe((feed: Array<PRActivity>) => {
      expect(feed.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalled();

      const actor1 = new Actor(5, 'jfive', 'http://git.me/jfive', 'https://github.com/avatars/u/5?');
      const repo1 = new Repository(9, 'bvanderlaan/test', 'https://github.com/bvanderlaan/test');
      const pr1 = new PullRequest('5555', 'This is another test PullRequest', 'https://github.com/bvanderlaan/test/pull/5555', 'This is the body of the other test PullRequest', actor1, PRState.Open);

      const activity1 = feed[0];
      expect(activity1.lastActivity.id).toEqual('000000');
      expect(activity1.lastActivity.type).toEqual('PullRequestEvent');
      expect(activity1.lastActivity.actor).toEqual(actor1);
      expect(activity1.repo).toEqual(repo1);
      expect(activity1.pr).toEqual(pr1);
      expect(activity1.isDeleted).toBeTruthy();
      expect(activity1.lastActivity.created_at).toEqual(new Date('2018-05-20T18:32:23Z'));
    });
    backend.expectOne('http://git.me/api/v3/users/bvanderlaan/received_events').flush([]);
  }));
});
