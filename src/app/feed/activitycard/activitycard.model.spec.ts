import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  Activity,
  Actor,
  Repository,
  PullRequest,
} from './activitycard.model';

describe('ActivityCardModel', () => {
  describe('Activity', () => {
    it('should set properties to default', () => {
      const a = new Activity();
      expect(a).toBeDefined();
      expect(a.id).toBeUndefined();
      expect(a.type).toBeUndefined();
      expect(a.actor).toBeUndefined();
      expect(a.repo).toBeUndefined();
      expect(a.pr).toBeUndefined();
      expect(a.action).toBeUndefined();
      expect(a.created_at).toBeUndefined();
    });

    it('should set properties', () => {
      const actor = new Actor(119, 'rwilco', 'https://github.com/api/v3/users/rwilco', 'https://github.com/avatars/u/119?');
      const repo = new Repository(9, 'bvanderlaan/test', 'https://github.com/api/v3/repos/bvanderlaan/test');
      const pr = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest');

      const a = new Activity('42', 'test', actor, repo, pr, 'merged', new Date());
      expect(a).toBeDefined();
      expect(a.id).toEqual('42');
      expect(a.type).toEqual('test');
      expect(a.actor).toEqual(actor);
      expect(a.repo).toEqual(repo);
      expect(a.pr).toEqual(pr);
      expect(a.action).toEqual('merged');
      expect(a.created_at instanceof Date).toBeTruthy();
    });

    it('should parse activity json', () => {
      const json = {
        id: '256826',
        type: 'PullRequestReviewCommentEvent',
        actor: {
            id: 119,
            display_login: 'rwilco',
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
            number: '1234',
            title: 'This is a test PullRequest',
            body: 'This is the body of the test PullRequest',
            html_url: 'https://github.com/bvanderlaan/test/pull/1234'
          },
        },
        created_at: '2017-11-24T18:32:23Z',
      };

      const a: Activity = Activity.fromJSON(json);
      const actor = new Actor(119, 'rwilco', 'https://github.com/api/v3/users/rwilco', 'https://github.com/avatars/u/119?');
      const repo = new Repository(9, 'bvanderlaan/test', 'https://github.com/api/v3/repos/bvanderlaan/test');
      const pr = new PullRequest('1234', 'This is a test PullRequest', 'https://github.com/bvanderlaan/test/pull/1234', 'This is the body of the test PullRequest');

      expect(a.id).toEqual('256826');
      expect(a.type).toEqual('PullRequestReviewCommentEvent');
      expect(a.actor).toEqual(actor);
      expect(a.repo).toEqual(repo);
      expect(a.pr).toEqual(pr);
      expect(a.created_at).toEqual(new Date('2017-11-24T18:32:23Z'));
    });
  });
});
