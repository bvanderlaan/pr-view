'use strict';

function getAction(json) {
  let action = ''
  switch (json.type) {
    case 'PullRequestReviewCommentEvent':
    case 'IssueCommentEvent':
      action = `commented on pull request`;
      break;
    case 'PullRequestEvent':
      const a = (json.payload.action === 'closed')
        ? json.payload.pull_request.merged
          ? 'merged'
          : 'closed'
        : json.payload.action;

      action = `${a} pull request`;
      break;
  }

  return action;
}

function createActor(json) {
  return Object.assign(Object.create(Actor.prototype), {
    id: json.actor.id,
    name: json.actor.display_login,
    url: json.actor.url,
    image: json.actor.avatar_url
  });
}

function createRepo(json) {
  return Object.assign(Object.create(Repository.prototype), {
    id: json.repo.id,
    name: json.repo.name,
    url: json.repo.url,
  });
}

function createPR(json) {
  const pull_request = json.payload.pull_request || json.payload.issue;

  return Object.assign(Object.create(PullRequest.prototype), {
    id: pull_request.number,
    title: pull_request.title,
    url: pull_request.html_url,
    body: pull_request.body,
  });
}

export class Activity {
  constructor(public id: string = undefined,
              public type: string = undefined,
              public actor: Actor = undefined,
              public repo: Repository = undefined,
              public pr: PullRequest = undefined,
              public action: string = undefined,
              public created_at: Date = undefined) {}

  static fromJSON(json): Activity {
    const actor = createActor(json)
    const repo = createRepo(json);
    const pr = createPR(json);

    return Object.assign(Object.create(Activity.prototype), {
      actor,
      repo,
      pr,
      id: json.id,
      type: json.type,
      action: getAction(json),
      created_at: new Date(json.created_at),
    })
  }
}

export class Actor {
  constructor(public id: number = undefined,
              public name: string = undefined,
              public url: string = undefined,
              public image: string = undefined) {}
}

export class Repository {
  constructor(public id: number = undefined,
              public name: string = undefined,
              public url: string = undefined) {}
}

export class PullRequest {
  constructor(public id: string = undefined,
              public title: string = undefined,
              public url: string = undefined,
              public body: string = undefined) {}
}

export class PRActivity {
  public activities: Array<Activity>;
  public repo: Repository;
  public pr: PullRequest;
  constructor(private activity: Activity = undefined) {
    this.activities = new Array<Activity>();
    if (activity) {
      this.repo = activity.repo;
      this.pr = activity.pr;
      this.addActivity(activity);
    }
  }

  addActivity(activity:Activity) {
    this.activities.push(activity);
  }

  includes(id:string) {
    this.activities.some((a:Activity) => (a.id === id))
  }

  get lastActivity() {
    return this.activities[this.activities.length-1];
  }

  get numberOfActivity() {
    return this.activities.length;
  }

}

export class Comment {
  constructor(public id: number,
              public file: string,
              public url: string,
              public message: string,
              public createdAt: Date,
              public updatedAt: Date) {}
}
