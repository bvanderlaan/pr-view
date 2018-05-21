'use strict';

function getAction(json) {
  let action = ''
  switch (json.type) {
    case 'PullRequestReviewCommentEvent':
    case 'IssueCommentEvent':
      action = `commented on pull request`;
      break;
    case 'PullRequestEvent':
      const a = isClosed(json)
        ? json.payload.pull_request.merged
          ? 'merged'
          : 'closed'
        : json.payload.action;

      action = `${a} pull request`;
      break;
  }

  return action;
}

function isClosed(json) {
  return (json.payload.action === 'closed');
}

function createActor(actor, baseURL = undefined) {
  return Object.assign(Object.create(Actor.prototype), {
    id: actor.id,
    name: actor.login,
    url: baseURL ? `${baseURL}/${actor.login}` : actor.url,
    image: actor.avatar_url
  });
}

function createRepo(json) {
  return Object.assign(Object.create(Repository.prototype), {
    id: json.repo.id,
    name: json.repo.name,
    url: json.repo.url,
  });
}

function createPR(json, baseURL = undefined) {
  const pull_request = json.payload.pull_request || json.payload.issue;

  return Object.assign(Object.create(PullRequest.prototype), {
    id: pull_request.number,
    title: pull_request.title,
    url: pull_request.html_url,
    body: pull_request.body,
    owner: createActor(pull_request.user, baseURL),
    state: !isClosed(json)
      ? PRState.Open
      : pull_request.merged ? PRState.Merged : PRState.Closed,
  });
}


export class Activity {
  constructor(public id: string = undefined,
              public type: string = undefined,
              public actor: Actor = undefined,
              public repo: Repository = undefined,
              public pr: PullRequest = undefined,
              public action: string = undefined,
              public created_at: Date = undefined,
              public read: boolean = false) {}

  static fromJSON(json, baseURL = ''): Activity {
    const actor = createActor(json.actor, baseURL)
    const repo = createRepo(json);
    const pr = createPR(json, baseURL);

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

export enum PRState {
  Open = 0,
  Closed = 1,
  Merged = 2,
}

export class PullRequest {
  constructor(public id: string = undefined,
              public title: string = undefined,
              public url: string = undefined,
              public body: string = undefined,
              public owner: Actor = new Actor(),
              public state: PRState = PRState.Open) {}

  get stateText() {
    return this.state === PRState.Open
      ? 'Open'
      : this.state === PRState.Closed
        ? 'Closed'
        : 'Merged';
  }
}

export class PRActivity {
  public activities: Array<Activity>;
  public repo: Repository;
  public pr: PullRequest;
  private deleted: boolean;

  constructor(private activity: Activity = undefined) {
    this.activities = new Array<Activity>();
    this.deleted = false;

    if (activity) {
      this.repo = activity.repo;
      this.pr = activity.pr;
      this.addActivity(activity);
    }
  }

  addActivity(activity:Activity) {
    if (!this.includes(activity.id)) {
      activity.read = false;
      this.deleted = false;
      this.activities.push(activity);
      this.pr.state = activity.pr.state;
    }
  }

  includes(id:string) {
    return this.activities.some((a:Activity) => (a.id === id))
  }

  markRead() {
    this.activities.forEach((activity) => (activity.read = true));
  }

  get isDeleted() {
    return this.deleted;
  }

  delete() {
    this.deleted = true;
  }

  get lastActivity() {
    return this.activities[this.activities.length-1];
  }

  get numberOfActivity() {
    return this.activities.length;
  }

  static fromJSON(json) {
    const repo = new Repository(json.repo.id, json.repo.name, json.repo.url);
    const prOwner = new Actor(json.pr.owner.id, json.pr.owner.name, json.pr.owner.url, json.pr.owner.image);
    const pr = new PullRequest(json.pr.id, json.pr.title, json.pr.url, json.pr.body, prOwner, json.pr.state);
    const activities = json.activities.map(a => {
      const actor = new Actor(a.actor.id, a.actor.name, a.actor.url, a.actor.image);
      return new Activity(a.id, a.type, actor, repo, pr, a.action, new Date(a.created_at), a.read);
    });

    return Object.assign(Object.create(PRActivity.prototype), {
      pr,
      repo,
      activities,
      deleted: json.deleted,
    });
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
